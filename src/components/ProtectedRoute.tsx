import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { PageLoader } from './Loader';

export const IsAuthenticated = ({ children } : any) => {

    const router = useRouter();
    const { data: session, status } = useSession();
    const [isAuth, setIsAuth] = useState<boolean>(false);

    const sessionX = session?.user?.user?.data;

    useEffect(() => {
        if (sessionX?.access_token && status === "authenticated" && sessionX?.refresh_token) {
            setIsAuth(true);
        } else {
            setIsAuth(false);
            router.push("/");
        }
    }, [session, router])

    return isAuth && children;

};

export const UnAuthenticated = ({ children } : any) => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [isAuth, setIsAuth] = useState<boolean>(true);

    const sessionX = session?.user?.user?.data;

    useEffect(() => {
        if (sessionX?.access_token && status === "authenticated" && sessionX?.refresh_token) {
            setIsAuth(false)
            router.push("/dashboard");
        } else {
            setIsAuth(true);
        }
    }, [session, router])


    return isAuth && children;

};