'use client';
import { UserOdoo } from "@/types/index";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Link, Avatar, User} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Router } from "../../../../../node_modules/next/router";

interface DropdownMenuprops {
    user: UserOdoo
}
export default (props: DropdownMenuprops) => {
    const router = useRouter();
    const { user } = props;
    const { name, email, avatar_128 } = user;

    return       <Dropdown placement="bottom-end">
    <DropdownTrigger>
      <User   
        as="button"
        className="transition-transform"
        name={name}
        description={(
          <p className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-small text-primary no-underline hover:opacity-80 active:opacity-disabled transition-opacity">
            {email}
          </p>
        )}
        avatarProps={{
          src: `data:image/png;base64,${avatar_128}`
        }}
        
    />
    </DropdownTrigger>
    <DropdownMenu aria-label="Profile Actions" variant="flat">
      <DropdownItem key="profile" className="h-14 gap-2">
        <p className="font-semibold">Signed in as</p>
        <p className="font-semibold">{email}</p>
      </DropdownItem>
      <DropdownItem key="settings">
        My Settings
      </DropdownItem>
      {/* <DropdownItem key="team_settings">Team Settings</DropdownItem>
      <DropdownItem key="analytics">
        Analytics
      </DropdownItem>
      <DropdownItem key="system">System</DropdownItem>
      <DropdownItem key="configurations">Configurations</DropdownItem>
      <DropdownItem key="help_and_feedback">
        Help & Feedback
      </DropdownItem> */}
      <DropdownItem key="logout" color="danger" onClick={()=> router.push(`/api/auth/signout`)}>
          Sign Out
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
}