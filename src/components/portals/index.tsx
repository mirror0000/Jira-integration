import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useLocalStorage } from "../../hooks/useLocalstorage";
import withAuth from "../../hoc/with-auth-redirect";
import TimelogModal from "../timelogModal";
// import TimelogModal from "../timelogModal";

const Portal: React.FC = () => {
    const [profile] = useLocalStorage<any>("profile", {});
    const [showModal, setShowModal] = useState<boolean>(false)

    const navigate = useNavigate();
    const [portals, setPortals] = useState([]);
    const [projects, setProjects] = useState([]);
    const [accessToken, setAccessToken] = useLocalStorage("access_token", "");
    const [projectData, setProjectData] = useState({});

    // new changes
    const [workspaces, setWorkspaces] = useState<any>([]);
    const [lists, setLists] = useState([]);

    // const handleGetPortals = async () => {
    //     try {
    //         const result: any = await axios.get(
    //             `${process.env.REACT_APP_BACKEND_API}/portals`,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${accessToken}`,
    //                 },
    //             }
    //         );
    //         if (result.data?.portals) {
    //             setPortals(result.data.portals);
    //             let projects: any = [];
    //             for (const portal of result.data?.portals) {
    //                 try {
    //                     const result: any = await axios.get(
    //                         `${process.env.REACT_APP_BACKEND_API}/portals/${portal.id}/projects`,
    //                         {
    //                             headers: {
    //                                 Authorization: `Bearer ${accessToken}`,
    //                             },
    //                         }
    //                     );
    //                     if (result.data?.projects) {
    //                         projects = [...projects, ...result.data.projects];
    //                     }
    //                 } catch (error) {
    //                     console.log(
    //                         "🚀 ~ file: index.tsx:17 ~ handleCallback ~ error:",
    //                         error
    //                     );
    //                 }
    //             }
    //             setProjects(projects);
    //         }
    //     } catch (error) {
    //         console.log(
    //             "🚀 ~ file: index.tsx:17 ~ handleCallback ~ error:",
    //             error
    //         );
    //     }
    // };

    const [isLoggedIn, setIsLoggedIn] = useLocalStorage( "isLoggedIn", false);

    const getAllWorkspaces = async () => {
        try {
            const result: any = await axios.get(
                `${process.env.REACT_APP_BACKEND_API}/portals/workspaces/all?access_token=${accessToken}`
            );
            if (result) {
                let workspaces: any = []
                workspaces = result.data;
                return workspaces;
                // setWorkspaces(workspaces?.teams);
                // console.log('ram', result?.data?.teams);
            }
        } catch (error) {   
            console.log(error);
        }
    }

    const getAllLists = async (workspaceID: any) => {
        try {
            const result: any = await axios.get(
                `${process.env.REACT_APP_BACKEND_API}/portals/${workspaceID}/lists`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            if (result) {
                return result?.data;
            }
        } catch (error) {   
            console.log(error);
        }
    }

    // const handleGetProjects = async () => {
    //     try {
    //         const result: any = await axios.get(
    //             `${process.env.REACT_APP_BACKEND_API}/portals/projects/all`,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${accessToken}`,
    //                 },
    //             }
    //         );
    //         if (result) {
    //             let projects: any = []
    //             projects = result?.data
    //             setProjects(projects);
    //         }
    //     } catch (error) {
    //         console.log(
    //             "🚀 ~ file: index.tsx:17 ~ handleCallback ~ error:",
    //             error
    //         );
    //     }
    // }
    const handleLogout = () => {
        setIsLoggedIn(false)
        localStorage.clear()
    }

    // useEffect(() => {
        // handleGetPortals();
        // handleGetProjects()
    //     (async () => await getAllWorkspaces())();
    // }, []);

    useEffect(() => {
        const updateWorkspaces = async () => {
            const workspaces = await getAllWorkspaces();
            console.log('ram', workspaces);
            // const workspacesWithLists = [];
            // if (workspaces.length) {
            //     for (const workspace of workspaces as any) {
            //         const lists = await getAllLists(workspace?.id);
            //         workspace['workspaceLists'] = lists;
            //         workspacesWithLists.push(workspace);
            //     }
            // }
            setWorkspaces(workspaces);
        }
        updateWorkspaces();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-between w-full max-w-2xl mt-8">
                <h1 className="text-2xl">Projects of: {workspaces?.username || ""}</h1>
                <button className="px-3 py-2 text-sm font-semibold text-white bg-blue-500 rounded lg:px-4 hover:bg-blue-600" onClick={handleLogout}>Logout</button>
            </div>
            <div>
                <div className="max-w-[80%] m-auto mt-10">
                    <div className="relative overflow-hidden not-prose bg-slate-50 rounded-xl dark:bg-slate-800/25">
                        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
                        <div className="relative overflow-auto rounded-xl">
                            <div className="my-8 overflow-scroll shadow-sm">
                                {
                                    // workspaces.length && workspaces.map((item: any) => {
                                    //     return (
                                    //         <>
                                    //         {/* <h1 className="ml-2 text-2xl">{item?.name}</h1> */}
                                    //         <table className="w-full text-sm border-collapse table-fixed">
                                    //             <thead>
                                    //                 <tr>
                                    //                     <th rowSpan={1} className="p-4 pt-0 pb-3 pl-8 font-medium text-center border-b dark:border-slate-600 text-slate-400 dark:text-slate-200 w-[50px]">S.N</th>
                                    //                     {/* <th rowSpan={1} className="p-4 pt-0 pb-3 pl-8 font-medium text-center border-b dark:border-slate-600 text-slate-400 dark:text-slate-200 w-[300px]">Space</th> */}
                                    //                     {/* <th rowSpan={1} className="p-4 pt-0 pb-3 font-medium text-center border-b dark:border-slate-600 text-slate-400 dark:text-slate-200 w-[300px]">Folder</th> */}
                                    //                     <th colSpan={1} className="p-4 pt-0 pb-3 pr-8 font-medium text-center border-b dark:border-slate-600 text-slate-400 dark:text-slate-200 w-[200px]">Lists</th>
                                    //                     <th colSpan={1} className="p-4 pt-0 pb-3 pr-8 font-medium text-center border-b dark:border-slate-600 text-slate-400 dark:text-slate-200 w-[200px]">Status</th>
                                    //                     <th colSpan={1} className="p-4 pt-0 pb-3 pr-8 font-medium text-center border-b dark:border-slate-600 text-slate-400 dark:text-slate-200 w-[200px]">Tasks Count</th>
                                    //                     <th colSpan={1} className="p-4 pt-0 pb-3 pr-8 font-medium text-center border-b dark:border-slate-600 text-slate-400 dark:text-slate-200 w-[200px]">Priority</th>
                                    //                     {/* <th colSpan={1} className="p-4 pt-0 pb-3 pr-8 font-medium text-center border-b dark:border-slate-600 text-slate-400 dark:text-slate-200 w-[200px]">Start Date</th> */}
                                    //                     <th colSpan={1} className="p-4 pt-0 pb-3 pr-8 font-medium text-center border-b dark:border-slate-600 text-slate-400 dark:text-slate-200 w-[200px]">Due Date</th>
                                    //                     <th rowSpan={1} className="p-4 pt-0 pb-3 pr-8 font-medium text-center border-b dark:border-slate-600 text-slate-400 dark:text-slate-200 w-[300px]">Action</th>
                                    //                 </tr>
                                    //                 {/* <tr>
                                    //                     <th className="p-4 pb-3 font-medium text-center border-b dark:border-slate-600 text-slate-400 dark:text-slate-200">Open</th>
                                    //                     <th className="p-4 pb-3 pr-8 font-medium text-center border-b dark:border-slate-600 text-slate-400 dark:text-slate-200">Closed</th>
                                    //                 </tr> */}
                                    //             </thead>
                                    //             <tbody className="bg-white dark:bg-slate-800">
                                    //                 {
                                    //                     item?.workspaceLists && item?.workspaceLists.map((list: any, index: number) => (
                                    //                         <tr key={index}>
                                    //                             <td className="p-4 pl-8 border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400">{index + 1}.</td>
                                    //                             {/* <td className="p-4 pl-8 text-center border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400">{list?.space?.name ?? 'N/A'}</td> */}
                                    //                             {/* <td className="p-4 text-center border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400">{list?.folder?.name ?? 'N/A'}</td> */}
                                    //                             <td className="p-4 pr-8 text-center border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400">{list?.name ?? 'N/A'}</td>
                                    //                             <td className="p-4 pr-8 text-center border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400">{list?.status ?? 'N/A' }</td>
                                    //                             <td className="p-4 pr-8 text-center border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400">{list?.task_count ?? 'N/A' }</td>
                                    //                             <td className="p-4 pr-8 text-center border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400">{list?.priority ?? 'N/A' }</td>
                                    //                             {/* <td className="p-4 pr-8 text-center border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400">{list?.start_date ?? 'N/A' }</td> */}
                                    //                             <td className="p-4 pr-8 text-center border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400">{list?.due_date ?? 'N/A' }</td>
                                    //                             <td className="p-4 pr-8 text-center border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400"> 
                                    //                                 <div className="flex gap-2">
                                    //                                     <button
                                    //                                         onClick={() => {
                                    //                                             navigate(
                                    //                                                 `/portals/${list?.id}/tasks`
                                    //                                             );
                                    //                                         }}
                                    //                                         className="px-3 text-sm font-semibold text-green-600 rounded cursor-pointer lg:px-4 dark:text-green-500 hover:underline"
                                    //                                     >View Tasks</button>
                                    //                                     {/* <button
                                    //                                         onClick={() => { setProjectData(project); setShowModal(true) }}
                                    //                                         className="px-3 text-sm font-semibold text-blue-600 rounded cursor-pointer lg:px-4 dark:text-blue-500 hover:underline"
                                    //                                     >Add Time log</button> */}
                                    //                                 </div>
                                    //                             </td>
                                    //                         </tr>
                                    //                     ))
                                    //                 }
    
                                    //             </tbody>
                                    //         </table>
                                    //         <br></br>
                                    //         </>
                                    //     )
                                    // }) 
                                }
                                <table className="w-full text-sm border-collapse table-fixed">
                                    <thead>
                                        <th rowSpan={1} className="p-4 pt-0 pb-3 pl-8 font-medium text-center border-b dark:border-slate-600 text-slate-400 dark:text-slate-200 w-[50px]">S.N</th>
                                        <th colSpan={1} className="p-4 pt-0 pb-3 pr-8 font-medium text-center border-b dark:border-slate-600 text-slate-400 dark:text-slate-200 w-[200px]">Lists</th>
                                        <th colSpan={1} className="p-4 pt-0 pb-3 pr-8 font-medium text-center border-b dark:border-slate-600 text-slate-400 dark:text-slate-200 w-[200px]">Status</th>
                                        <th colSpan={1} className="p-4 pt-0 pb-3 pr-8 font-medium text-center border-b dark:border-slate-600 text-slate-400 dark:text-slate-200 w-[200px]">Tasks Count</th>
                                        <th colSpan={1} className="p-4 pt-0 pb-3 pr-8 font-medium text-center border-b dark:border-slate-600 text-slate-400 dark:text-slate-200 w-[200px]">Priority</th>
                                        <th colSpan={1} className="p-4 pt-0 pb-3 pr-8 font-medium text-center border-b dark:border-slate-600 text-slate-400 dark:text-slate-200 w-[200px]">Due Date</th>
                                        <th rowSpan={1} className="p-4 pt-0 pb-3 pr-8 font-medium text-center border-b dark:border-slate-600 text-slate-400 dark:text-slate-200 w-[300px]">Action</th>
                                    </thead>
                                    <tbody className="bg-white dark:bg-slate-800">
                                        {
                                            !workspaces
                                        }
                                        {
                                            workspaces.length && workspaces.map((project: any, index: number) => (
                                                <tr key={index}>
                                                    <td className="p-4 pl-8 border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400">{index + 1}.</td>
                                                    <td className="p-4 pr-8 text-center border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400">{project?.name ?? 'N/A'}</td>
                                                    <td className="p-4 pr-8 text-center border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400">{project?.status ?? 'N/A' }</td>
                                                    <td className="p-4 pr-8 text-center border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400">{project?.task_count ?? 'N/A' }</td>
                                                    <td className="p-4 pr-8 text-center border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400">{project?.priority ?? 'N/A' }</td>
                                                    <td className="p-4 pr-8 text-center border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400">{project?.due_date ?? 'N/A' }</td>
                                                    <td className="p-4 pr-8 text-center border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400"> 
                                                        <div className="flex gap-2">
                                                            <button
                                                            onClick={() => {
                                                                navigate(
                                                                    `/portals/${project?.name}/tasks`
                                                                );
                                                            }}
                                                            className="px-3 text-sm font-semibold text-green-600 rounded cursor-pointer lg:px-4 dark:text-green-500 hover:underline"
                                                            >View Tasks</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="absolute inset-0 border pointer-events-none border-black/5 rounded-xl dark:border-white/5"></div>
                    </div>
                </div>
            </div>
            {
                showModal &&
                <TimelogModal showModal={showModal} setShowModal={setShowModal} projectData={projectData} />
            }
        </div>
    );
};

export default withAuth(Portal);
