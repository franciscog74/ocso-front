import { API_URL } from "@/constants";
import axios from "axios";

export default async function CountPage() {
    const countLocations = await axios.get(`${API_URL}/locations`)
        .catch((e) => ({data: []}));
    return countLocations.data.length;
}