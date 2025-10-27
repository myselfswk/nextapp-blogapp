// "use client";

// import { useState, FormEvent, startTransition } from "react";
// import dynamic from "next/dynamic";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import 'react-quill-new/dist/quill.snow.css';
// import { addProject } from "@/actions/create-project";
// import { useActionState } from "react";

// const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// const AddProject = () => {
//     const [content, setContent] = useState("");
//     const [formState, action, isPending] = useActionState(addProject, { errors: {} });

//     const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         const formData = new FormData(e.currentTarget);
//         formData.append("description", content);

//         startTransition(() => {
//             action(formData);
//         });
//     };

//     return (
//         <div className="max-w-4xl mx-auto p-6">
//             <Card className="dark:bg-neutral-900 bg-white shadow-lg border border-gray-200 dark:border-neutral-800">
//                 <CardHeader>
//                     <CardTitle className="text-2xl font-bold">Add New Project</CardTitle>
//                 </CardHeader>

//                 <CardContent>
//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         {/* Title */}
//                         <div className="space-y-2">
//                             <Label htmlFor="title">Project Title</Label>
//                             <Input id="title" name="title" placeholder="Enter project title" />
//                             {formState?.errors?.title && (
//                                 <span className="text-sm text-red-500">{formState.errors.title}</span>
//                             )}
//                         </div>

//                         {/* Category */}
//                         <div className="space-y-2">
//                             <Label htmlFor="category">Category</Label>
//                             <select
//                                 id="category"
//                                 name="category"
//                                 className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm
//                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
//                             >
//                                 <option value="">Select Category</option>
//                                 <option value="JS">Plain JavaScript</option>
//                                 <option value="React">ReactJS</option>
//                                 <option value="Next">NextJS</option>
//                             </select>
//                             {formState.errors?.category && (
//                                 <span className="text-sm text-red-500">{formState.errors.category}</span>
//                             )}
//                         </div>

//                         {/* Tech Stack */}
//                         <div className="space-y-2">
//                             <Label htmlFor="tech">Technologies (comma separated)</Label>
//                             <Input
//                                 id="tech"
//                                 name="tech"
//                                 placeholder="e.g. Next.js, Tailwind, Node.js"
//                             />
//                             {formState.errors?.tech && (
//                                 <span className="text-sm text-red-500">{formState.errors.tech}</span>
//                             )}
//                         </div>

//                         {/* Live Link */}
//                         <div className="space-y-2">
//                             <Label htmlFor="live">Live URL</Label>
//                             <Input
//                                 id="live"
//                                 name="live"
//                                 type="url"
//                                 placeholder="https://your-project-live-link.com"
//                             />
//                             {formState.errors?.live && (
//                                 <span className="text-sm text-red-500">{formState.errors.live}</span>
//                             )}
//                         </div>

//                         {/* GitHub Link */}
//                         <div className="space-y-2">
//                             <Label htmlFor="github">GitHub Repository</Label>
//                             <Input
//                                 id="github"
//                                 name="github"
//                                 type="url"
//                                 placeholder="https://github.com/username/repo"
//                             />
//                             {formState.errors?.github && (
//                                 <span className="text-sm text-red-500">{formState.errors.github}</span>
//                             )}
//                         </div>

//                         {/* Featured Image */}
//                         <div className="space-y-2">
//                             <Label htmlFor="image">Project Image</Label>
//                             <Input id="image" name="image" type="file" accept="image/*" />
//                             {formState.errors?.image && (
//                                 <span className="text-sm text-red-500">{formState.errors.image}</span>
//                             )}
//                         </div>

//                         {/* Description */}
//                         <div className="space-y-2">
//                             <Label>Project Description</Label>
//                             <ReactQuill
//                                 theme="snow"
//                                 value={content}
//                                 onChange={setContent}
//                                 className="bg-white dark:bg-neutral-800 text-black dark:text-white"
//                                 placeholder="Write about your project..."
//                             />
//                             {formState.errors?.description && (
//                                 <span className="text-sm text-red-500">{formState.errors.description}</span>
//                             )}
//                         </div>

//                         {/* Form Error */}
//                         {formState.errors?.formErrors && (
//                             <div className="p-2 bg-red-100 dark:bg-transparent border border-red-600 rounded-md">
//                                 <span className="text-sm text-red-600">
//                                     {formState.errors.formErrors}
//                                 </span>
//                             </div>
//                         )}

//                         {/* Actions */}
//                         <div className="flex justify-end gap-4">
//                             <Button type="button" variant="outline">Cancel</Button>
//                             <Button disabled={isPending} type="submit">
//                                 {isPending ? "Publishing..." : "Publish Project"}
//                             </Button>
//                         </div>
//                     </form>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// };

// export default AddProject;