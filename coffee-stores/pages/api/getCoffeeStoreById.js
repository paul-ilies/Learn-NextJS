import { table, getRecords } from "../../lib/airtable";

const getCoffeeStoreById = async (req, res) => {
    const { id } = req.query;
    if (req.method === "GET") {
        let filteredCoffeeStore

        try {
            if (id) {
                const coffeeStoreRecord = await table.select({
                    filterByFormula: `id="${id}"`
                }).firstPage()

                filteredCoffeeStore = getRecords(coffeeStoreRecord)

                if (filteredCoffeeStore.length) {
                    res.status(200).json(filteredCoffeeStore)
                } else {
                    res.status(400).json({ message: "id could not be found" })
                }
            } else {
                res.status(400).json({ message: "id is missing" })
            }

        } catch (error) {
            res.status(500).json({ message: "Something went wrong" })
        }
    }
}

export default getCoffeeStoreById