import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";
import { Invoice } from "../../models/Invoice";
import { GraphQLContext } from "../../utils";

@Resolver(Invoice)
export class InvoiceFieldResolvers {
	@FieldResolver()
	vendor(@Root() { id }: Invoice, @Ctx() { prisma }: GraphQLContext) {
		return prisma.invoice.findOne({ where: { id } }).vendor();
	}

	@FieldResolver()
	activity(@Root() { id }: Invoice, @Ctx() { prisma }: GraphQLContext) {
		return prisma.invoice.findOne({ where: { id } }).activity();
	}

	@FieldResolver()
	byDept(@Root() { id }: Invoice, @Ctx() { prisma }: GraphQLContext) {
		return prisma.invoice.findOne({ where: { id } }).byDept();
	}

	@FieldResolver()
	uploadedBy(@Root() { id }: Invoice, @Ctx() { prisma }: GraphQLContext) {
		return prisma.invoice.findOne({ where: { id } }).uploadedBy();
	}

	@FieldResolver()
	media(@Root() { id }: Invoice, @Ctx() { prisma }: GraphQLContext) {
		return prisma.invoice.findOne({ where: { id } }).media();
	}

	@FieldResolver()
	channels(@Root() { id }: Invoice, @Ctx() { prisma }: GraphQLContext) {
		return prisma.invoice.findOne({ where: { id } }).channels();
	}
}
