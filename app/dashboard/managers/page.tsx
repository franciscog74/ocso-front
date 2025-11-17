import { LuPlus } from "react-icons/lu";
import GenericModal from "../_components/GenericModal";
import FormNewManager from "./_components/FormNewManager";

export default function ManagersPage() {
    return (
        <div className="absolute bottom-10 right-10">
            <GenericModal button={<LuPlus size={20} />}>
                <FormNewManager />
            </GenericModal>
        </div>
    );
}