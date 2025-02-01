import React from 'react'
import { fetchPortfolioData, getContactData } from '../actions';
import { AdminPage } from './components/AdminPage';
import HeaderAuth from '@/components/header-auth';
import { EnvVarWarning } from '@/components/env-var-warning';
import Link from 'next/link';
import { hasEnvVars } from '@/utils/supabase/check-env-vars';


async function page() {
    const projectsData = await fetchPortfolioData();
    const contactData = await getContactData();
    return (
        <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col items-center">
                <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 sticky top-0 bg-background">
                    <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                        <div className="flex gap-5 items-center font-semibold">
                            <Link href={"/"}>Admin Panel</Link>
                        </div>
                        {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                    </div>
                </nav>
                <AdminPage Data={projectsData as any} contactData={contactData as any} />
            </div>
        </main>

    )
}

export default page