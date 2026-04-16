import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileIcon, ImageIcon, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MediaViewDetails({ data }) {
    const media = data?.installation_photos || [];
    const documents = data?.baa_documents || [];

    const handlePreview = (url) => {
        if (url) {
            window.open(url, "_blank");
        } else {
            alert("Preview tidak tersedia untuk file ini.");
        }
    };

    return (
        <div className="rounded-sm bg-muted/40 p-4">
            <Tabs defaultValue="documents" className="w-full">
                <TabsList className="w-full justify-center items-center border-b rounded-none bg-transparent h-auto p-0 gap-8">
                    <TabsTrigger
                        value="media"
                        className="w-full rounded-none border-b-2 border-transparent bg-transparent px-2 py-3 text-sm font-semibold text-muted-foreground data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none transition-all"
                    >
                        Media
                    </TabsTrigger>
                    <TabsTrigger
                        value="documents"
                        className="w-full rounded-none border-b-2 border-transparent bg-transparent px-2 py-3 text-sm font-semibold text-muted-foreground data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none transition-all"
                    >
                        Documents
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="media" className="pt-4 space-y-3">
                    {media.length > 0 ? (
                        media.map((file, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4 p-2 border border-slate-200 rounded-sm bg-white"
                            >
                                <div className="bg-primary p-2 rounded-lg shadow-sm shadow-blue-200">
                                    <FileIcon className="text-white h-6 w-6" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-foreground truncate cursor-pointer 
                                        decoration-primary underline-offset-4 hover:underline hover:text-primary 
                                        transition-all duration-200" onClick={() => handlePreview(file.url)}>
                                        {file.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-center py-10 text-muted-foreground">No media uploaded.</p>
                    )}
                </TabsContent>

                <TabsContent value="documents" className="pt-4 space-y-3">
                    {documents.length > 0 ? (
                        documents.map((doc, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4 p-2 border border-slate-200 rounded-sm bg-white"
                            >
                                <div className="bg-primary p-2 rounded-lg shadow-sm shadow-blue-200">
                                    <FileIcon className="text-white h-6 w-6" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-foreground truncate cursor-pointer 
                                        decoration-primary underline-offset-4 hover:underline hover:text-primary 
                                        transition-all duration-200" onClick={() => handlePreview(doc.url)}>{doc.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {(doc.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-center py-10 text-muted-foreground">No documents uploaded.</p>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}