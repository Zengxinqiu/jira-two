import React from "react"
// import * as qs from "qs"

import { List } from "./list"
import { SearchPanel } from "./search-panel"
import {  useDebounce, useDocumentTitle} from "utils";


import {  useProjects } from "utils/project";


import { useProjectModel, useProjectsSearchParams } from "./util";
import { useUsers } from "utils/user";
import { ButtonNoPadding, ErrorBox, Row, ScreenContainer } from "components/lib";

// 注意点 apiurl REACT_APP_API_URL 一定要写对

export const ProjectListScreen = (
) => {

    // const [param, setParam] = useState({
    //     name: "    const { data: users } = useUsers()",
    //     personId: "",
    // })
  
    const[param, setParam]  =  useProjectsSearchParams()
 
    const { isLoading, error, data: list } = useProjects(useDebounce(param, 200));
    const {data: users}= useUsers()    

    useDocumentTitle("项目列表", true);
    const {open} = useProjectModel()
    return (
     
            <ScreenContainer>
            <Row between={true} marginBottom={2}>
                <h1>项目列表</h1>
                <ButtonNoPadding onClick={open} type={"link"}>创建项目</ButtonNoPadding>
            </Row>
      
            <SearchPanel param={param} setParam={setParam} users={users || []}/>
                
             <ErrorBox error={error}></ErrorBox>
                
     
            <List
              
                loading={isLoading}
                users={users || []}
                dataSource={list || []}>
                
                </List>
            </ScreenContainer>
          


    )
}
ProjectListScreen.whyDidYouRender =false;
