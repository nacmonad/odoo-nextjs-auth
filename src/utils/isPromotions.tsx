import { UserOdoo } from "@/types/index";

export default (user: UserOdoo ) => {
    console.log("Is promotions? ", user);
    const r = user?.groups_id.find((id : number) => [65,66].includes(id));

    return r
}