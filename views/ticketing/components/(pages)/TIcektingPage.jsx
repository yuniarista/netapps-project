"use client";

import { getModalConfig } from "@/utils/getModalConfig";
import CustomDialog from "@/components/dialog/basicDialog";
import { useTicketingState } from "../../hooks/usTicketingHooks";
import { TicketingModalConfig } from "../../configs/TicketingModalConfig";
import PageHeader from "@/components/pageHeader";
import TicketingActionConfig from "../../configs/TicketingActionConfig";
import TicketingDataTable from "../(table)/TicketingDataTable";
import TicketingDataColumn from "../(table)/TicketingDataColumn";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import CustomButton from "@/components/button/customButton";
import { ChevronLeft } from "lucide-react";

const categoryFilters = [
  { label: "All", value: "all" },
  { label: "Open", value: "open" },
  { label: "In Progress", value: "inProgress" },
  { label: "Resolved", value: "resolved" },
  { label: "Closed", value: "closed" },
];

const statusFilters = [
  { label: "All", value: "all" },
  { label: "Bug", value: "bug" },
  { label: "Account", value: "account" },
  { label: "Security", value: "security" },
  { label: "Billing", value: "billing" },
  { label: "Payment", value: "payment" },
  { label: "Feature", value: "feature" },
  { label: "UX", value: "ux" },
];

const divisionData = [
  { label: "Technical", value: "technical" },
  { label: "Account Support", value: "account-support" },
  { label: "Finance", value: "finance" },
  { label: "Sales", value: "sales" },
  { label: "Security", value: "security" },
];

const priorityData = [
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];

const dummyTickets = {
  totalData: 4,
  data: [
    {
      id: "TK-001",
      title: "App Crasher on Login",
      priority: "",
      status: "open",
      author: "Adolf Hitler",
      timeAgo: "2026-03-25T09:50:00Z",
      category: "bug",
      assignee: "technical",
    },
    {
      id: "TK-002",
      title: "Double Charge on Subscription",
      priority: "high",
      status: "in-progress",
      author: "Surya Ngurah",
      timeAgo: "10 mins ago",
      category: "billing",
      assignee: "finance",
    },
    {
      id: "TK-003",
      title: "Cannot change profile picture",
      priority: "low",
      status: "resolved",
      author: "I Gusti",
      timeAgo: "1 hour ago",
      category: "account",
      assignee: "account-support",
    },
    {
      id: "TK-004",
      title: "Cannot change profile picture",
      priority: "low",
      status: "resolved",
      author: "I Gusti",
      timeAgo: "1 hour ago",
      category: "account",
      assignee: "account-support"
    },
  ],
};

export default function TicketingPage({ uri }) {
  const {
    form,
    setForm,
    openModal,
    setOpenModal,
    modalType,
    setModalType,
    data,
    setData,
    search,
    setSearch,
    response,
    setResponse,
    loading,
    setLoading,
    paginationModel,
    setPaginationModel,
    alertOpen,
    setAlertOpen,
    handleModalOpen,
    handleModalClose,
    selectedRows,
    setSelectedRows,
    filterParams,
    setFilterParams,
  } = useTicketingState();

  const areaData = [
    { label: "Denpasar", value: "denpasar" },
    { label: "Tabanan", value: "tabanan" },
    { label: "Jembrana", value: "jembrana" },
  ];

  const formOptions = {
    area: areaData,
  };

  const modalConfig = getModalConfig(
    modalType,
    TicketingModalConfig({
      form,
      formOptions,
      loading,
      response,
      setResponse,
      alertOpen,
      setAlertOpen,
      selectedRows,
      setSelectedRows,
    }),
  );

  const actions = TicketingActionConfig(
    (type, item) => {
      if (type === "detail") {
        setSelectedTicketId(item);
      } else {
        handleModalOpen(type, item);
      }
    },
    ["update", "delete", "detail", "notify"],
  );

  const [nameFilter, setNameFilter] = useState("");
  const [activeStatus, setActiveStatus] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const getFilterParams = (name) => [{ key: "search", value: name }];

  const filteredTickets = useMemo(() => {
    return dummyTickets?.data.filter((ticket) => {
      const matchesSearch =
        ticket.title.toLowerCase().includes(nameFilter.toLowerCase()) ||
        ticket.id.toLowerCase().includes(nameFilter.toLowerCase());
      const matchesStatus =
        activeStatus === "all" || ticket.status === activeStatus;
      const matchesCategory =
        activeCategory === "all" || ticket.category === activeCategory;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [nameFilter, activeStatus, activeCategory]);

  const getStatusStyles = (status) => {
    switch (status) {
      case "open":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      case "in-progress":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "resolved":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      default:
        return "bg-transparent border-none";
    }
  };

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case "medium":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      case "high":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      case "low":
        return "bg-slate-500/10 text-slate-600";
      default:
        return "bg-transparent border-none";
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 w-full h-full overflow-hidden">
        {/* Sidebar */}
        <div className="w-[300px] flex flex-col space-y-4 z-10 border-r">
          {/* search bar */}
          <div className="px-2">
            <div className="py-4 px-2 border-b">
              <Input
                placeholder="Search ticket..."
                value={nameFilter}
                onChange={(e) => {
                  setNameFilter(e.target.value);
                }}
                className="max-w-xs"
              />
            </div>
          </div>
          {/* filter category */}
          <div className="px-2">
            <div className="flex flex-wrap gap-1 overflow-y-auto scrollbar-hidden-y border-b pb-4">
              {categoryFilters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActiveCategory(f.value)}
                  className={cn(
                    "px-2.5 py-1 text-xs font-semibold rounded-full border transition-all",
                    activeStatus === f.value
                      ? "bg-primary/10 text-primary border-primary"
                      : "bg-transparent hover:bg-primary/10 hover:text-primary text-foreground border-border hover:border-primary/50",
                  )}
                >
                  {f.label === "All"
                    ? `${f.label} (${f.value === "all" && filteredTickets.length})`
                    : f.label}
                </button>
              ))}
            </div>
          </div>
          {/* filter status */}
          <div className="px-2">
            <div className="flex flex-wrap gap-1 overflow-y-auto scrollbar-hidden-y border-b pb-4">
              {statusFilters.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setActiveStatus(c.value)}
                  className={cn(
                    "px-2.5 py-1 text-xs font-semibold rounded-full border transition-all",
                    activeCategory === c.value
                      ? "bg-primary/10 text-primary border-primary"
                      : "bg-transparent hover:bg-primary/10 hover:text-primary text-foregorund border-border hover:border-primary/50",
                  )}
                >
                  {c.label === "All"
                    ? `${c.label} (${c.value === "all" && filteredTickets.length})`
                    : c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="px-2 flex flex-col gap-2 overflow-y-auto scrollbar-hidden-y">
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <div key={ticket.id}>
                  <div
                    onClick={() => setSelectedTicketId(ticket)}
                    className={cn(
                      "flex flex-col p-3 space-y-3 rounded-lg cursor-pointer transition-all",
                      selectedTicketId?.id === ticket.id
                        ? "bg-amber-500/10"
                        : "bg-transparent hover:bg-amber-500/10",
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <span className="flex gap-1 items-center text-primary text-sm font-bold">
                        {ticket.id}
                        {ticket.priority === "" && (
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-[10px] font-semibold uppercase px-2.5 py-0.5",
                              "bg-amber-500/10 text-amber-600 border-amber-500/20",
                            )}
                          >
                            New
                          </Badge>
                        )}
                      </span>
                      <div className="flex gap-1 items-center">
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-[10px] font-semibold uppercase px-2.5 py-1",
                            getPriorityStyles(ticket.priority),
                          )}
                        >
                          {ticket.priority.replace("-", " ")}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-[10px] font-semibold uppercase px-2.5 py-1",
                            getStatusStyles(ticket.status),
                          )}
                        >
                          {ticket.status.replace("-", " ")}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-foreground line-clamp-1">
                      {ticket.title}
                    </p>

                    <div className="flex justify-between items-center text-[11px] text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[8px] font-medium text-muted-foredorund">
                          CN
                        </div>
                        <span>{ticket.author}</span>
                      </div>
                      <span>{ticket.timeAgo}</span>
                    </div>
                  </div>
                  <Separator />
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-muted-foreground text-sm">
                No tickets found.
              </div>
            )}
          </div>
        </div>
        {/* Main */}
        <div className="flex-1 z-0">
          <PageHeader>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-muted-foreground">
                    NetApp Settings
                  </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  {selectedTicketId ? (
                    <BreadcrumbLink
                      asChild
                      className="cursor-pointer"
                      onClick={() => setSelectedTicketId(null)}
                    >
                      <span>Ticket</span>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>Ticket</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {selectedTicketId && (
                  <>
                    <BreadcrumbItem>
                      <BreadcrumbPage>{selectedTicketId.id}</BreadcrumbPage>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </PageHeader>
          <div className="flex-1 h-full overflow-y-auto scrollbar-hidden-y">
            {selectedTicketId ? (
              <div className="flex flex-col p-4 h-[calc(100vh-80px)] overflow-y-auto scrollbar-hidden-y space-y-4">
                <div className="flex justify-between">
                  <div className="flex gap-4 items-center">
                    <h2 className="text-lg text-primary font-semibold">
                      {selectedTicketId.id}
                    </h2>
                    <div className="flex gap-1">
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[10px] font-semibold uppercase px-2.5 py-1",
                          getPriorityStyles(selectedTicketId.priority),
                        )}
                      >
                        {selectedTicketId.priority.replace("-", " ")}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[10px] font-semibold uppercase px-2.5 py-1",
                          getStatusStyles(selectedTicketId.status),
                        )}
                      >
                        {selectedTicketId.status.replace("-", " ")}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex gap-2 items-center">
                    <CustomButton
                      variant="secondary"
                      onClick={() => setSelectedTicketId(null)}
                      className="flex gap-1"
                    >
                      <ChevronLeft className="text-primary" /> Back
                    </CustomButton>
                    <CustomButton variant="primary">Save & Notify</CustomButton>
                  </div>
                </div>
                <div className="p-4 border rounded-md">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-row gap-4 items-center">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground">
                        CN
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label className="text-foreground text-lg font-semibold leading-7">
                          {selectedTicketId.author}
                        </Label>
                        <p className="text-muted-foreground text-xs font-normal leading-5">
                          {selectedTicketId.email || "example.com"}
                        </p>
                        <p className="text-muted-foreground text-xs font-normal leading-5">
                          📱 {selectedTicketId.divice || "Poco X7 Pro"}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 text-end">
                      <p className="text-muted-foreground text-xs font-normal leading-5">
                        Submitted 3 days ago
                      </p>
                      <p className="text-muted-foreground text-xs font-normal leading-5">
                        Update 5 mins ago
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 p-4 border rounded-md">
                  <div className="flex flex-col gap-1">
                    <Label className="text-muted-foreground text-sm font-medium leading-5">
                      Issue Title
                    </Label>
                    <p className="text-foreground text-lg font-semibold leading-7">
                      {selectedTicketId.title}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="text-muted-foreground text-sm font-medium leading-5">
                      Description
                    </Label>
                    <p className="text-foreground text-lg font-medium leading-7">
                      {selectedTicketId.description ||
                        "something wrong on my divice"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <div className="p-4 flex flex-col gap-2 border rounded-md">
                    Category
                    <div className="flex flex-wrap gap-1">
                      {categoryFilters
                        .filter((c) => c.value !== "all")
                        .map((c) => (
                          <button
                            key={c.value}
                            onClick={() => setActiveCategory(c.value)}
                            className={cn(
                              "px-2.5 py-1 text-xs font-semibold rounded-full border transition-all",
                              activeCategory === c.value
                                ? "bg-primary/10 text-primary border-primary"
                                : "bg-transparent hover:bg-primary/10 hover:text-primary text-foregorund border-border hover:border-primary/50",
                            )}
                          >
                            {c.label === "All"
                              ? `${c.label} (${c.value === "all" && filteredTickets.length})`
                              : c.label}
                          </button>
                        ))}
                    </div>
                  </div>
                  <div className="p-4 flex flex-col gap-2 border rounded-md">
                    Status
                    <div className="flex flex-wrap gap-1">
                      {statusFilters
                        .filter((c) => c.value !== "all")
                        .map((c) => (
                          <button
                            key={c.value}
                            onClick={() => setActiveStatus(c.value)}
                            className={cn(
                              "px-2.5 py-1 text-xs font-semibold rounded-full border transition-all",
                              activeCategory === c.value
                                ? "bg-primary/10 text-primary border-primary"
                                : "bg-transparent hover:bg-primary/10 hover:text-primary text-foregorund border-border hover:border-primary/50",
                            )}
                          >
                            {c.label === "All"
                              ? `${c.label} (${c.value === "all" && filteredTickets.length})`
                              : c.label}
                          </button>
                        ))}
                    </div>
                  </div>
                  <div className="p-4 flex flex-col gap-2 border rounded-md">
                    Assign to Division
                    <div className="flex flex-wrap gap-1">
                      {divisionData.map((c) => (
                        <button
                          key={c.value}
                          onClick={() => setActiveStatus(c.value)}
                          className={cn(
                            "px-2.5 py-1 text-xs font-semibold rounded-full border transition-all",
                            activeCategory === c.value
                              ? "bg-primary/10 text-primary border-primary"
                              : "bg-transparent hover:bg-primary/10 hover:text-primary text-foregorund border-border hover:border-primary/50",
                          )}
                        >
                          {c.label === "All"
                            ? `${c.label} (${c.value === "all" && filteredTickets.length})`
                            : c.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 flex flex-col gap-2 border rounded-md">
                    Priority
                    <div className="flex flex-wrap gap-1">
                      {priorityData.map((c) => (
                        <button
                          key={c.value}
                          onClick={() => setActiveStatus(c.value)}
                          className={cn(
                            "px-2.5 py-1 text-xs font-semibold rounded-full border transition-all",
                            activeCategory === c.value
                              ? "bg-primary/10 text-primary border-primary"
                              : "bg-transparent hover:bg-primary/10 hover:text-primary text-foregorund border-border hover:border-primary/50",
                          )}
                        >
                          {c.label === "All"
                            ? `${c.label} (${c.value === "all" && filteredTickets.length})`
                            : c.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-md">
                  {/* textinputform area */}
                  <Label>Reply to user</Label>
                  <textarea
                    className={cn(
                      "flex mt-2 min-h-[110px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    )}
                    placeholder="Write a reply to the user in their mobile app..."
                  />
                </div>

                <div className="flex gap-2">
                  <CustomButton
                    variant="secondary"
                    onClick={() => setSelectedTicketId(null)}
                  >
                    Cancel
                  </CustomButton>
                  <CustomButton variant="primary">
                    SaveChange & Notify user
                  </CustomButton>
                </div>
              </div>
            ) : (
              <div className="flex flex-col p-4 gap-4">
                <Label className="font-semibold text-card-foreground text-2xl">
                  Ticket List
                </Label>
                <div className="grid grid-cols-4 gap-2">
                  <div className="w-full border rounded-md flex flex-col p-6 gap-1">
                    <Label className="text-lg text-muted-foreground font-normal">
                      Open Ticket
                    </Label>
                    <p className="text-2xl text-card-foreground font-semibold">
                      05
                    </p>
                  </div>
                  <div className="w-full border rounded-md flex flex-col p-6 gap-1">
                    <Label className="text-lg text-muted-foreground font-normal">
                      In Progress
                    </Label>
                    <p className="text-2xl text-card-foreground font-semibold">
                      12
                    </p>
                  </div>
                  <div className="w-full border rounded-md flex flex-col p-6 gap-1">
                    <Label className="text-lg text-muted-foreground font-normal">
                      Resolved
                    </Label>
                    <p className="text-2xl text-card-foreground font-semibold">
                      15
                    </p>
                  </div>
                  <div className="w-full border rounded-md flex flex-col p-6 gap-1">
                    <Label className="text-lg text-muted-foreground font-normal">
                      Closed
                    </Label>
                    <p className="text-2xl text-card-foreground font-semibold">
                      24
                    </p>
                  </div>
                </div>
                <TicketingDataTable
                  uri={uri}
                  data={dummyTickets}
                  setData={setData}
                  columns={TicketingDataColumn({
                    actions,
                  })}
                  handleModalOpen={handleModalOpen}
                  search={search}
                  setSearch={setSearch}
                  // handleFilter={handleFilter}
                  filterParams={filterParams}
                  setFilterParams={setFilterParams}
                  setLoading={setLoading}
                  paginationModel={paginationModel}
                  setPaginationModel={setPaginationModel}
                  selectedRows={selectedRows}
                  setSelectedRows={setSelectedRows}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <CustomDialog
        open={openModal}
        onOpenChange={handleModalClose}
        title={modalConfig.title}
        modalType={modalType}
        headerAlignment="start"
        titleClassname="text-xl p-3"
        withHeaderBorder={modalType === "delete"}
      >
        {modalConfig.content}
      </CustomDialog>
    </div>
  );
}
