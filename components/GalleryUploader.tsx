'use client';

import { useState, useEffect } from 'react';
import { Upload, X, GripVertical } from 'lucide-react';
import { savePhoto, getPhoto, deletePhoto, fileToBlob, blobToURL } from '@/lib/indexedDB';

interface Media {
  id: string;
  type: string;
  url: string;
  nom?: string;
  description?: string;
}

interface GalleryUploaderProps {
  medias: Media[];
  onMediasChange: (medias: Media[]) => void;
  memorialId: string;
  maxPhotos?: number;
}

export default function GalleryUploader({ 
  medias = [], 
  onMediasChange, 
  memorialId,
  maxPhotos = 20
}: GalleryUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [mediasWithUrls, setMediasWithUrls] = useState<Media[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    loadMediaUrls();
  }, [medias]);

  const loadMediaUrls = async () => {
    const mediasWithLoadedUrls = await Promise.all(
      medias.map(async (media) => {
        if (media.url && media.url.startsWith('indexed-db:')) {
          const photoId = media.url.replace('indexed-db:', '');
          try {
            const photo = await getPhoto(photoId);
            if (photo) {
              const url = blobToURL(photo.blob);
              return { ...media, url };
            }
          } catch (error) {
            console.error('Erreur chargement média:', error);
          }
        }
        return media;
      })
    );
    setMediasWithUrls(mediasWithLoadedUrls);
  };

  const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (medias.length + files.length > maxPhotos) {
      alert(`Vous ne pouvez ajouter que ${maxPhotos} photos maximum`);
      return;
    }

    setIsUploading(true);

    try {
      const newMedias: Media[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (!file.type.startsWith('image/')) {
          continue;
        }

        if (file.size > 10 * 1024 * 1024) {
          alert(`${file.name} est trop grand (maximum 10 Mo)`);
          continue;
        }

        const blob = await fileToBlob(file);
        const id = `gallery-${memorialId}-${Date.now()}-${i}`;
        
        await savePhoto({
          id,
          memorialId,
          type: 'image',
          blob,
          nom: file.name,
        });

        newMedias.push({
          id,
          type: 'image',
          url: `indexed-db:${id}`,
          nom: file.name,
        });
      }

      onMediasChange([...medias, ...newMedias]);
    } catch (error) {
      console.error('Erreur upload:', error);
      alert('Erreur lors de l\'upload des photos');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleRemove = async (index: number) => {
    const media = medias[index];
    
    if (media.url && media.url.startsWith('indexed-db:')) {
      const photoId = media.url.replace('indexed-db:', '');
      try {
        await deletePhoto(photoId);
      } catch (error) {
        console.error('Erreur suppression:', error);
      }
    }

    const newMedias = medias.filter((_, i) => i !== index);
    onMediasChange(newMedias);
  };

  const handleDescriptionChange = (index: number, description: string) => {
    const newMedias = [...medias];
    newMedias[index] = { ...newMedias[index], description };
    onMediasChange(newMedias);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newMedias = [...medias];
    const draggedMedia = newMedias[draggedIndex];
    newMedias.splice(draggedIndex, 1);
    newMedias.splice(index, 0, draggedMedia);
    
    setDraggedIndex(index);
    onMediasChange(newMedias);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="space-y-4">
      {medias.length < maxPhotos && (
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFilesChange}
            disabled={isUploading}
            className="hidden"
          />
          <div className="border-2 border-dashed border-memoir-blue/20 rounded-lg p-6 hover:border-memoir-gold/50 transition-colors bg-memoir-blue/5 hover:bg-memoir-gold/5">
            <div className="flex flex-col items-center gap-2">
              {isUploading ? (
                <>
                  <div className="animate-spin w-6 h-6 border-4 border-memoir-gold border-t-transparent rounded-full" />
                  <p className="text-sm text-memoir-blue/70">Chargement...</p>
                </>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-memoir-gold" />
                  <div className="text-center">
                    <p className="font-medium text-memoir-gold">
                      Ajouter des photos
                    </p>
                    <p className="text-xs text-memoir-blue/50 mt-1">
                      Sélectionnez plusieurs fichiers • JPG, PNG, WebP • Max {maxPhotos} photos
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </label>
      )}

      {mediasWithUrls.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-memoir-blue/70">
            {mediasWithUrls.length} photo{mediasWithUrls.length > 1 ? 's' : ''} • Glissez pour réorganiser
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {mediasWithUrls.map((media, index) => (
              <div
                key={media.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`relative group border-2 rounded-lg overflow-hidden transition-all ${
                  draggedIndex === index 
                    ? 'border-memoir-gold scale-95 opacity-50' 
                    : 'border-memoir-blue/10 hover:border-memoir-gold/30'
                }`}
              >
                <div className="absolute top-2 left-2 bg-black/50 rounded p-1 cursor-move z-10">
                  <GripVertical className="w-4 h-4 text-white" />
                </div>

                <button
                  onClick={() => handleRemove(index)}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 rounded-full transition-colors z-10"
                >
                  <X className="w-3 h-3 text-white" />
                </button>

                <img
                  src={media.url}
                  alt={media.nom || `Photo ${index + 1}`}
                  className="w-full h-40 object-cover"
                />

                <div className="p-2 bg-white">
                  <input
                    type="text"
                    value={media.description || ''}
                    onChange={(e) => handleDescriptionChange(index, e.target.value)}
                    placeholder="Légende (optionnelle)"
                    className="w-full text-xs px-2 py-1 border border-memoir-blue/10 rounded focus:border-memoir-gold focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {medias.length === 0 && (
        <p className="text-center text-memoir-blue/50 text-sm py-4">
          Aucune photo ajoutée pour le moment
        </p>
      )}
    </div>
  );
}