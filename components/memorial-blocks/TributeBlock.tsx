'use client';

import TributeMemorial from '@/components/TributeMemorial';

interface TributeBlockProps {
    prenom?: string;
    memorialId: string;
    template: any;
}

export default function TributeBlock({ prenom, memorialId, template }: TributeBlockProps) {
    if (!prenom) return null;

    return (
        <TributeMemorial
            prenom={prenom}
            memorialId={memorialId}
            accentColor={template.colors.accent}
            textColor={template.colors.text}
            bgColor={template.colors.bg}
        />
    );
}
