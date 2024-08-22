

export class Admin {

    static async addContacts(contacts: number[], location: {lat: number, long: number}){
        // Todo: Add contacts to database
    }

    static async getNearestContacts(location: {lat: number, long: number}): Promise<number[]> {
        return new Promise((resolve, reject) => {
            resolve([
                7854875421,
            ]);
        })
    }

}