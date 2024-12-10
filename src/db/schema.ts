import {
	pgTable,
	uniqueIndex,
	text,
	doublePrecision,
	timestamp,
	foreignKey,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm/relations";

export const room = pgTable("room", {
	id: text("id").primaryKey().notNull(),
	roomNumber: text("room_number").notNull(),
	roomType: text("room_type").notNull(),
	status: text("status").default("available").notNull(),
	rate: doublePrecision("rate").notNull(),
	createdAt: timestamp("created_at", { precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => ({
	roomNumberKey: uniqueIndex("room_roomnumber_key").on(table.roomNumber),
}));

export const payment = pgTable("payment", {
	id: text("id").primaryKey().notNull(),
	reservationId: text("reservation_id").notNull(),
	amount: doublePrecision("amount").notNull(),
	paymentDate: timestamp("payment_date", { precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	paymentMethod: text("payment_method").notNull(),
}, (table) => ({
	paymentReservationIdFkey: foreignKey({
		columns: [table.reservationId],
		foreignColumns: [reservation.id],
		name: "payment_reservationid_fkey",
	})
		.onUpdate("cascade")
		.onDelete("restrict"),
}));

export const guest = pgTable("guest", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	contactInfo: text("contact_info"),
	createdAt: timestamp("created_at", { precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const reservation = pgTable("reservation", {
	id: text("id").primaryKey().notNull(),
	guestId: text("guest_id").notNull(),
	roomId: text("room_id").notNull(),
	checkInDate: timestamp("check_in_date", { precision: 3 }).notNull(),
	checkOutDate: timestamp("check_out_date", { precision: 3 }).notNull(),
	status: text("status").default("reserved").notNull(),
	paymentStatus: text("payment_status").default("pending").notNull(),
	createdAt: timestamp("created_at", { precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => ({
	reservationGuestIdFkey: foreignKey({
		columns: [table.guestId],
		foreignColumns: [guest.id],
		name: "reservation_guestid_fkey",
	})
		.onUpdate("cascade")
		.onDelete("restrict"),
	reservationRoomIdFkey: foreignKey({
		columns: [table.roomId],
		foreignColumns: [room.id],
		name: "reservation_roomid_fkey",
	})
		.onUpdate("cascade")
		.onDelete("restrict"),
}));

export const paymentRelations = relations(payment, ({ one }) => ({
	reservation: one(reservation, {
		fields: [payment.reservationId],
		references: [reservation.id],
	}),
}));

export const reservationRelations = relations(reservation, ({ one, many }) => ({
	payments: many(payment),
	guest: one(guest, {
		fields: [reservation.guestId],
		references: [guest.id],
	}),
	room: one(room, {
		fields: [reservation.roomId],
		references: [room.id],
	}),
}));

export const guestRelations = relations(guest, ({ many }) => ({
	reservations: many(reservation),
}));

export const roomRelations = relations(room, ({ many }) => ({
	reservations: many(reservation),
}));
