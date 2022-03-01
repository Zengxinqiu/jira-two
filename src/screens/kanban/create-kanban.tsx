import { Input } from "antd";
import { useState } from "react"
import { useAddKanban } from "utils/kanban";
import { Container } from "./kanban-colum";
import { useKanbansQueryKey, useProjectIdInUrl } from "./util"


export const CreateKanban = () => {
    const [name, setName] = useState("")
    const projectId = useProjectIdInUrl();
    const { mutateAsync: addkanban } = useAddKanban(useKanbansQueryKey())
    

    const submit = async () => {
        await addkanban({ name, projectId })
        setName("")
    }
    return (
        <Container>
            <Input
                size={"large"}
                placeholder={"新建看板名称"}
                onPressEnter={submit}
                value={name}
                onChange={(evt)=>setName(evt.target.value)}
            
            />
        </Container>
    )
}