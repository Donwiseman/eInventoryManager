import { Button } from "@/components/ui/button";
import Logo from "./logo";
import { useUser } from "@/contexts/user-context";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";


export default function Navbar() {
    return (
        <nav className="h-[70px] md:h-14 w-full border-b bg-background flex justify-between items-center px-4">
            <div className="flex flex-grow item-center">
                <Logo />
            </div>
            <div className="flex h-full flex-grow items-center"></div>
            <div className="flex h-full flex-grow justify-end items-center">
                <Avatar>
                    <AvatarFallback>
                        ei
                    </AvatarFallback>
                </Avatar>
            </div>
        </nav>
    )
}