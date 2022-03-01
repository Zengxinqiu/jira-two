import { QueryKey, useMutation, useQuery } from "react-query";
import { Projects } from "type/project";
import { Task } from "type/task";
import { useHttp } from "./http";
import { SortProps } from "./kanban";
import { useAddConfig, useDeleteConfig, useEditConfig, useReorderTaskConfig } from "./use-optimistc-options";



export const useTasks = (param?: Partial<Task>) => {
    const client = useHttp()

    return useQuery<Task[]>(["tasks", param], () =>
        client("tasks", { data: param })
    )
}



export const useAppTask = (queryKey: QueryKey) => {
    const client = useHttp()
    return useMutation(
        (param: Partial<Task>) =>
            client(`tasks`, {
                data: param,
                method: "POST",
            }),
        useAddConfig(queryKey)
    )
}
export const useTask = (id?: number) => {
    const client = useHttp();
    return useQuery<Projects>(["task", { id }], () => client(`tasks/${id}`), {
        enabled: Boolean(id),
    });
};

export const useEditTask = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation(
        (params: Partial<Task>) =>
            client(`tasks/${params.id}`, {
                method: "PATCH",
                data: params,
            }),
        useEditConfig(queryKey)
    );
};

export const useDeleteTask = (queryKey: QueryKey) => {
    const client = useHttp();

    return useMutation(
        ({ id }: { id: number }) =>
            client(`tasks/${id}`, {
                method: "DELETE",
            }),
        useDeleteConfig(queryKey)
    );
};

export const useReorderTask = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation((params: SortProps) => {
        return client("tasks/reorder", {
            data: params,
            method: "POST",
        });
    }, useReorderTaskConfig(queryKey));
};