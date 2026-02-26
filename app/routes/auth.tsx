import React from 'react';
import { useEffect } from 'react';
import {usePuterStore} from "~/lib/puter";
import {useLocation, useNavigate} from "react-router";


export const meta = () => ([
    { title: 'ResuMate | Auth'},
    { name: 'description', content: 'Log into your ResuMate Account' },
])

const Auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1];
    const navigate = useNavigate();

    useEffect(()=>{
        if(auth.isAuthenticated) navigate(next)
    },[auth.isAuthenticated, next])

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover flex items-center justify-center min-h-screen">
            <div className="gradient-border shadow-lg">
                <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1>Welcome to ResuMate</h1>
                        <h2>Log In to continue your Job Search</h2>
                    </div>
                    <div>
                        {isLoading ? (<button className="auth-button animate-pulse">
                                <p>Signing In...</p>
                        </button> )
                        : <>
                            {auth.isAuthenticated ? (<button className="auth-button onClick={auth.signOut}">
                                <p>Sign Out</p>
                                </button>)
                            :(<button className="auth-button" onClick={auth.signIn}>
                                    <p>Sign In</p>
                                </button>)}
                            </>
                            }
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Auth;