import React from 'react'
import { Database } from '@/lib/database.types';

export function ContactQueries({ queries }: { queries: Database['public']['Tables']['contact_messages']['Row'][] }) {
    console.log(queries)
    return (
        <div className="space-y-4 max-w-6xl mx-auto">
            {queries && queries.map((query: any) => (
                <div key={query.id} className="bg-neutral-900 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="font-bold">{query.name}</h3>
                            <p className="text-sm text-gray-400">{query.email}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <p className="text-xs text-gray-500">{new Date(query.created_at).toLocaleDateString()}</p>
                            <span className="text-sm px-2 py-1 rounded bg-gray-800">
                                {query.status || 'New'}
                            </span>
                        </div>
                    </div>
                    <h4 className="font-medium text-gray-300 mb-2">{query.subject}</h4>
                    <p className="text-gray-400 whitespace-pre-wrap">{query.message}</p>
                </div>
            ))}
        </div>
    )
}

export default ContactQueries  