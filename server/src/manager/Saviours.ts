import { User } from "../db/User";
import { Admin } from "../db/Admin";

export interface Ilocation {
    lat: number;
    long: number;
}

export class Saviours {

    async getNearestContacts(userId: string, location: Ilocation): Promise<number[]> {
        // Todo: get nearest contacts from database
        const a: number[] = await Admin.getNearestContacts(location);

        // Todo: get user's added contacts from database
        const b: number[] = await User.getUserAddedContacts(userId);

        const c = a.concat(b);

        return c;
    }

}