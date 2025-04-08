import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
    // whenever you user user in server component when you're using clerk auth, we use currentUser
    const user = await currentUser();
    if (!user) return null;

    const loggedInUser = await prisma.user.findUnique({ where: { clerkUserId: user.id } });
    if (!loggedInUser) {
        await prisma.user.create({
            data: {
                name: `${user.firstName} ${user.lastName}`,
                clerkUserId: user.id,
                email: user.emailAddresses[0].emailAddress,
                imageUrl: user.imageUrl
            }
        });
    }

    return (
        <div>{children}</div>
    )
}

export default Layout;