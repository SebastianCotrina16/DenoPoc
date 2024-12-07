import { pgTable, uniqueIndex, text, doublePrecision, timestamp, foreignKey } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm/relations";

export const room = pgTable("Room", {
	id: text().primaryKey().notNull(),
	roomNumber: text().notNull(),
	roomType: text().notNull(),
	status: text().default("available").notNull(),
	rate: doublePrecision().notNull(),
	createdAt: timestamp({ precision: 3, mode: "string" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => ({
	roomNumberKey: uniqueIndex("Room_roomNumber_key").on(table.roomNumber),
}));

export const payment = pgTable("Payment", {
	id: text().primaryKey().notNull(),
	reservationId: text().notNull(),
	amount: doublePrecision().notNull(),
	paymentDate: timestamp({ precision: 3, mode: "string" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	paymentMethod: text().notNull(),
}, (table) => ({
	paymentReservationIdFkey: foreignKey({
		columns: [table.reservationId],
		foreignColumns: [reservation.id],
		name: "Payment_reservationId_fkey",
	}).onUpdate("cascade").onDelete("restrict"),
}));

export const guest = pgTable("Guest", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	contactInfo: text(),
	createdAt: timestamp({ precision: 3, mode: "string" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const reservation = pgTable("Reservation", {
	id: text().primaryKey().notNull(),
	guestId: text().notNull(),
	roomId: text().notNull(),
	checkInDate: timestamp({ precision: 3, mode: "string" }).notNull(),
	checkOutDate: timestamp({ precision: 3, mode: "string" }).notNull(),
	status: text().default("reserved").notNull(),
	paymentStatus: text().default("pending").notNull(),
	createdAt: timestamp({ precision: 3, mode: "string" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => ({
	reservationGuestIdFkey: foreignKey({
		columns: [table.guestId],
		foreignColumns: [guest.id],
		name: "Reservation_guestId_fkey",
	}).onUpdate("cascade").onDelete("restrict"),
	reservationRoomIdFkey: foreignKey({
		columns: [table.roomId],
		foreignColumns: [room.id],
		name: "Reservation_roomId_fkey",
	}).onUpdate("cascade").onDelete("restrict"),
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
