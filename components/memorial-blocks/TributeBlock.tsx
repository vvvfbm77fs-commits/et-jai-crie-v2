'use client';

import TributeMemorial, { TributeLabels } from '@/components/TributeMemorial';

interface TributeBlockProps {
    prenom?: string;
    memorialId: string;
    template: any;
    type?: 'funeraire' | 'vivant' | 'objet';
    labels?: TributeLabels;
}

export default function TributeBlock({ prenom, memorialId, template, type = 'funeraire', labels }: TributeBlockProps) {
    if (!prenom) return null;

    return (
        <TributeMemorial
            prenom={prenom}
            memorialId={memorialId}
            accentColor={template.colors.accent}
            textColor={template.colors.text}
            bgColor={template.colors.bg}
            type={type}
            labels={labels}
        />
    );
}
