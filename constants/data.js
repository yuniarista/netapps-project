export const stepper_config = [
  { 
    id: "step-1", 
    title: "Check Coverage", 
    sub: "Sales", 
    endpoint: "users/profile",
    notif: { 
      variant: "muted", 
      title: "users need coverage verification",
      description: "Sales — verify coverage for new users."
    }
  },
  { 
    id: "step-2", 
    title: "Pre-Sales Lead", 
    sub: "Sales", 
    endpoint: "users/profile",
    notif: { 
      variant: "info", 
      title: "users need coverage verification",
      description: "Sales — verify coverage for new users."
    }
  },
  { 
    id: "step-3", 
    title: "Data + Confirmation", 
    sub: "Sales Admin", 
    endpoint: "customers/active",
    notif: { 
      variant: "warning", 
      title: "customers awaiting data completion",
      description: "Sales Admin — complete each customers full data so the order can be confirmed."
    }
  },
  { 
    id: "step-4", 
    title: "Billing & Payment", 
    sub: "Finance", 
    endpoint: "customers/active",
    notif: { 
      variant: "warning", 
      title: "customers awaiting data completion",
      description: "Sales Admin — complete each customers full data so the order can be confirmed."
    }
  },
  { 
    id: "step-5", 
    title: "Assign Technician", 
    sub: "Technical Admin", 
    endpoint: "technicians/pending",
    notif: { 
      variant: "info", 
      title: "work orders need technician assignment",
      description: "Technical Admin — please assign available technicians."
    }
  }
];