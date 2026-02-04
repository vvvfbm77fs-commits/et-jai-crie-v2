'use client';

import { useState, useEffect } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { savePhoto, getPhoto, deletePhoto, fileToBlob, blobToURL } from '@/lib/indexedDB';

interface PhotoUploaderProps {
  photoId?: string;
  onPhotoChange: (photoId: string | undefined) => void;
  memorialId: string;
  label?: string;
}

export default function PhotoUploader({ 
  photoId, 
  onPhotoChange, 
  memorialId,
  label = "Photo de profil" 
}: PhotoUploaderProps) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (photoId) {
      loadPhoto(photoId);
    }
    
    return () => {
      if (photoUrl) {
        URL.revokeObjectURL(photoUrl);
      }
    };
  }, [photoId]);

  const loadPhoto = async (id: string) => {
    try {
      const photo = await getPhoto(id);
      if (photo) {
        const url = blobToURL(photo.blob);
        setPhotoUrl(url);
      }
    } catch (error) {
      console.error('Erreur chargement photo:', error);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('L\'image est trop grande (maximum 10 Mo)');
      return;
    }

    setIsUploading(true);

    try {
      const blob = await fileToBlob(file);
      const id = `photo-profil-${memorialId}-${Date.now()}`;
      
      await savePhoto({
        id,
        memorialId,
        type: 'image',
        blob,
        nom: file.name,
      });

      if (photoUrl) {
        URL.revokeObjectURL(photoUrl);
      }

      const url = blobToURL(blob);
      setPhotoUrl(url);
      onPhotoChange(id);
    } catch (error) {
      console.error('Erreur upload:', error);
      alert('Erreur lors de l\'upload de la photo');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async () => {
    if (photoId) {
      try {
        await deletePhoto(photoId);
        if (photoUrl) {
          URL.revokeObjectURL(photoUrl);
        }
        setPhotoUrl(null);
        onPhotoChange(undefined);
      } catch (error) {
        console.error('Erreur suppression:', error);
      }
    }
  };

  return (
    <div className="space-y-3">
      {photoUrl ? (
        <div className="border-2 border-memoir-gold/30 rounded-lg overflow-hidden bg-memoir-gold/5">
          <div className="relative">
            <img
              src={photoUrl}
              alt={label}
              className="w-full h-64 object-cover"
            />
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 rounded-full transition-colors shadow-lg"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
          <div className="p-3 text-center">
            <p className="text-sm text-memoir-blue/70">
              Cliquez sur la croix pour changer la photo
            </p>
          </div>
        </div>
      ) : (
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
            className="hidden"
          />
          <div className="border-2 border-dashed border-memoir-blue/20 rounded-lg p-8 hover:border-memoir-gold/50 transition-colors bg-memoir-blue/5 hover:bg-memoir-gold/5">
            <div className="flex flex-col items-center gap-3">
              {isUploading ? (
                <>
                  <div className="animate-spin w-8 h-8 border-4 border-memoir-gold border-t-transparent rounded-full" />
                  <p className="text-sm text-memoir-blue/70">Chargement...</p>
                </>
              ) : (
                <>
                  <ImageIcon className="w-12 h-12 text-memoir-gold" />
                  <div className="text-center">
                    <p className="font-medium text-memoir-gold mb-1">
                      Ajouter une {label.toLowerCase()}
                    </p>
                    <p className="text-xs text-memoir-blue/50">
                      JPG, PNG, WebP (max 10 Mo)
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </label>
      )}
    </div>
  );
}