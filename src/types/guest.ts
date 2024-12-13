export interface Guest {
    id: number;
    name: string;
    contactInfo?: string;
    createdAt: Date;
}

export type RegisterGuestInput = Omit<Guest, "id" | "createdAt">;
export type UpdateGuestInput = Partial<RegisterGuestInput>;
