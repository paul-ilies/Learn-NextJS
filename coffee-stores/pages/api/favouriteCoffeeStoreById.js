import { table, getRecords } from "../../lib/airtable";

const favouriteCoffeeStoreById = async (req, res) => {

    if (req.method === "PUT") {
        try {
            const { id } = req.query;

            const coffeeStoreRecord = await table.select({
                filterByFormula: `id="${id}"`
            }).firstPage()
            let filteredCoffeeStore = getRecords(coffeeStoreRecord)
            const record = filteredCoffeeStore[0]
            const calculatingVoting = record.voting + 1

            // const calculatedVoting = parseInt(record.voting) + 1
            // console.log(calculatedVoting)

            // const updateRecord = await table.update({
            //     id: record.recordId,
            //     fields: {
            //         voting: calculatedVoting
            //     }
            // })
            const updateRecord = await table.update({
                id: record.recordId,
                fields: {
                    voting: calculatingVoting
                }
            })
            res.json({ record })
        } catch (error) {
            res.status(500).json({ message: "something went wrong", error })
        }
    }
}

export default favouriteCoffeeStoreById