
import { QueryKey, useMutation, useQuery } from "react-query";
import { Projects } from "type/project";

import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig, useEditConfig } from "./use-optimistc-options";



export const useProjects = (param?: Partial<Projects>) => {
    const client = useHttp();

    return useQuery<Projects[]>(["projects", param], () => client("projects", { data: param })

    )
}

export const useDletedProject = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation(
        ({ id }: { id: number }) => client(`projects/${id}`, {
            method: "DELETE",
        }),
        useDeleteConfig(queryKey)
    )
}
export const useEditProjects = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation(
        (params: Partial<Projects>) =>
            client(`projects/${params.id}`, {
                method: "PATCH",
                data: params,
            }),
        useEditConfig(queryKey)
    );
}




export const useAddProject = (queryKey: QueryKey) => {
    const client = useHttp();

    return useMutation(
        (params: Partial<Projects>) =>
            client(`projects`, {
                data: params,
                method: "POST",
            }),
        useAddConfig(queryKey)
    );
};

export const useProject = (id?: number) => {
    const client = useHttp();
    return useQuery<Projects>(
        ["project", { id }],
        () => client(`projects/${id}`),
        {
            enabled: Boolean(id)
        }
    )
}