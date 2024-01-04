import { UserOdoo } from "@/types/index";

export default (user: UserOdoo ) => {
    if(!user?.groups_id) return false;
    const r = user?.groups_id.find((id : number) => [65,66].includes(id));

    return r
}