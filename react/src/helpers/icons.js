import { faTrash, faSignOutAlt, faEdit, faSpinner, faPlusCircle, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";

import { library } from "@fortawesome/fontawesome-svg-core";

const Icons = () => (
    library.add(faTrash, faSignOutAlt, faEdit, faSpinner, faPlusCircle, faLock, faEnvelope)
)

export default Icons;