'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Download, Filter, TrendingUp } from 'lucide-react';

// Mock data
const MOCK_COMMISSIONS = [
    { id: '1', date: '15/01/2026', type: 'Upsell (5 contributeurs)', amount: 20, commission: 5, status: 'Payé' },
    { id: '2', date: '12/01/2026', type: 'Plaque funéraire', amount: 129, commission: 20, status: 'Payé' },
    { id: '3', date: '08/01/2026', type: 'Renouvellement', amount: 29, commission: 4.35, status: 'Payé' },
    { id: '4', date: '05/01/2026', type: 'Plaque funéraire', amount: 129, commission: 20, status: 'En attente' },
];

export default function CommissionsPage() {
    const router = useRouter();
    const [period, setPeriod] = useState('month');

    const totalCommission = MOCK_COMMISSIONS.reduce((acc, curr) => acc + curr.commission, 0);

    return (
        <div className="min-h-screen bg-[#F5F4F2] p-8">
            <header className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-white rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6 text-[#0F2A44]" />
                    </button>
                    <div>
                        <h1 className="text-3xl text-[#0F2A44] font-serif italic mb-1">Commissions</h1>
                        <p className="text-[#0F2A44]/60 text-sm">Suivi de vos revenus partenaires</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg text-[#0F2A44] text-sm border border-[#C9A24D]/20 hover:border-[#C9A24D] transition-colors">
                        <Download className="w-4 h-4" />
                        Exporter
                    </button>
                </div>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#C9A24D]/10">
                    <p className="text-sm text-gray-500 mb-2">Commissions ce mois</p>
                    <div className="flex items-end gap-2">
                        <span className="text-4xl font-bold text-[#0F2A44]">{totalCommission.toFixed(2)}€</span>
                        <span className="text-green-500 text-sm font-medium mb-1 flex items-center">
                            <TrendingUp className="w-3 h-3 mr-1" /> +12%
                        </span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#C9A24D]/10">
                    <p className="text-sm text-gray-500 mb-2">Total versé (2026)</p>
                    <span className="text-4xl font-bold text-[#0F2A44]">1 240.50€</span>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#C9A24D]/10">
                    <p className="text-sm text-gray-500 mb-2">En attente de versement</p>
                    <span className="text-4xl font-bold text-[#C9A24D]">20.00€</span>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-[#C9A24D]/10 overflow-hidden">
                <div className="p-4 border-b border-[#C9A24D]/10 flex justify-between items-center bg-[#F9F9F9]">
                    <h3 className="font-medium text-[#0F2A44]">Historique des transactions</h3>
                    <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#0F2A44]">
                        <Filter className="w-4 h-4" />
                        Filtrer
                    </button>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-[#F9F9F9] text-xs uppercase text-gray-500 font-medium">
                        <tr>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Montant Vente</th>
                            <th className="px-6 py-4">Votre Commission</th>
                            <th className="px-6 py-4">Statut</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {MOCK_COMMISSIONS.map((comm) => (
                            <tr key={comm.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-gray-900">{comm.date}</td>
                                <td className="px-6 py-4 text-gray-600 font-medium">{comm.type}</td>
                                <td className="px-6 py-4 text-gray-500">{comm.amount}€</td>
                                <td className="px-6 py-4 font-bold text-[#C9A24D]">+{comm.commission}€</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${comm.status === 'Payé'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {comm.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
