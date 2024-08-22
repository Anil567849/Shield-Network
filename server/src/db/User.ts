

export class User {

    static async addContacts(userId: string, contacts: number[]) {
        // Todo: Add contacts to database
    }

    static async getUserAddedContacts(userId: string): Promise<number[]> {
        return new Promise((resolve, reject) => {
            resolve([
                7070707070,
                7070707071,
                7070707072,
                7070707073,
                7070707074,
                7070707075,
                7070707076,
                7070707077,
                7070707078,
                7070707079,
                7070707089,
            ]);
        })
    }

}