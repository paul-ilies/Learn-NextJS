import { table, getRecords } from "../../lib/airtable";

const createCoffeeStore = async (req, res) => {

    // find a store 
    if (req.method === "POST") {
        let filteredCoffeeStore
        const { Id, voting, name, address, neighbourhood, imgUrl
        } = req.body
        try {
            const coffeeStoreRecord = await table.select({
                filterByFormula: `id="${Id}"`
            }).firstPage()
            filteredCoffeeStore = getRecords(coffeeStoreRecord)
            if (filteredCoffeeStore.length) {
                res.status(200).json(filteredCoffeeStore)
            } else {
                const createRecords = await table.create([
                    {
                        fields: {
                            Id,
                            voting,
                            name,
                            address,
                            neighbourhood,
                            imgUrl

                        }
                    }
                ])
                const records = getRecords(createRecords)
                res.json({ message: "create a record", records })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Error finding store" })
        }
    }



}

export default createCoffeeStore;