import { Form, Input} from "antd"
import { UserSelect } from "components/user-select"
import React from "react"
import { Projects } from "type/project"
import { User } from "type/user"

// import { useState } from "react"


interface SearchPanelProps {
    users: User[],
    param:Partial<Pick<Projects,"name"| "personId">>
    setParam: (param : SearchPanelProps['param']) => void;
}


export const SearchPanel = ({ users,param, setParam}:SearchPanelProps) => {

    return <Form layout="inline" style={{marginBottom:"2rem"}}>
        <Form.Item>
            <Input
                type="text"
                placeholder={"项目名"}
                value={param.name}
                onChange={evt => setParam({ ...param, name: evt.target.value })}
            />
        
        </Form.Item>
        <Form.Item>
            <UserSelect
                defaultOptionName={"负责人"}
                value={param.personId}
                onChange={value => setParam({ ...param, personId: value })}/>
           
         
        </Form.Item>
    </Form>
}