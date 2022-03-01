import styled from "@emotion/styled"
import { Spin } from "antd"
import { Drag, Drop, DropChild } from "components/drag-and-drop"
import { ScreenContainer } from "components/lib"
import React, { useCallback } from "react"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import { useDocumentTitle } from "utils"
import { useKanban, useReorderKanban } from "utils/kanban"
import { useReorderTask, useTasks } from "utils/task"
import { CreateKanban } from "./create-kanban"
import { KanbanColumn } from "./kanban-colum"
import { SearchPanel } from "./search-panel"
import { TaskModel } from "./task-model"
import {  useKanbanSearchParams, useKanbansQueryKey, useProjectInUtl, useTasksQueryKey, useTasksSearchParams } from "./util"





export const KanbanScreen = () => {



useDocumentTitle("看板列表", true)
    const { data: currentProject } = useProjectInUtl()
    const { data: kanbans,isLoading:kanbanInLoading } = useKanban(useKanbanSearchParams())
    const {isLoading:taskIsloading} = useTasks(useTasksSearchParams())
    const isLoading = taskIsloading || kanbanInLoading
    

  const onDragEnd = useDragEnd()
    return (
        <DragDropContext onDragEnd={onDragEnd}>
        <ScreenContainer>
          <h1>{currentProject?.name}看板</h1>
          <SearchPanel />
          {isLoading ? (
            <Spin size={"large"} />
          ) : (
            <ColumnContainer>
            <Drop
              type={"COLUMN"}
              direction={"horizontal"}
              droppableId={"kanban"}
            >
              <DropChild style={{ display: "flex" }}>
                {kanbans?.map((kanban, index) => (
                  <Drag
                    key={kanban.id}
                    draggableId={"kanban" + kanban.id}
                    index={index}
                  >
                    <KanbanColumn kanban={kanban} key={kanban.id} />
                  </Drag>
                ))}
              </DropChild>
            </Drop>
            <CreateKanban />
          </ColumnContainer>
           
          )}
          <TaskModel />
        </ScreenContainer>
      </DragDropContext>
     
    )
}

export const ColumnContainer = styled.div`
display: flex;
overflow-x: scroll;
flex: 1;

`

export const useDragEnd = () => {
  const { data: kanbans } = useKanban(useKanbanSearchParams());
  const { mutate: reorderKanban } = useReorderKanban(useKanbansQueryKey());
  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey());
  const { data: allTasks = [] } = useTasks(useTasksSearchParams());

  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) {
        return;
      }
      // 看板排序
      if (type === "COLUMN") {
        const fromId = kanbans?.[source.index].id;
        const toId = kanbans?.[destination.index].id;
        if (!fromId || !toId || fromId === toId) {
          return;
        }
        const type = destination.index > source.index ? "after" : "before";
        reorderKanban({ fromId, referenceId: toId, type });
      }
      if (type === "ROW") {
        const fromKanbanId = +source.droppableId;
        const toKanbanId = +destination.droppableId;
        if (fromKanbanId === toKanbanId) {
          return;
        }
        const fromTask = allTasks.filter(
          (task) => task.kanbanId === fromKanbanId
        )[source.index];
        const toTask = allTasks.filter((task) => task.kanbanId === toKanbanId)[
          destination.index
        ];
        if (fromTask?.id === toTask?.id) {
          return;
        }
        reorderTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          fromKanbanId,
          toKanbanId,
          type:
            fromKanbanId === toKanbanId && destination.index > source.index
              ? "after"
              : "before",
        });
      }
    },
    [kanbans, reorderKanban, allTasks, reorderTask]
  );
};
