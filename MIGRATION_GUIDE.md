# Drizzle to Prisma Migration Guide

This document outlines the migration from Drizzle ORM to Prisma for the Bhutan tourism application.

## Migration Overview

### What was changed:
1. **Dependencies**: Replaced `drizzle-orm`, `drizzle-zod`, and `drizzle-kit` with `@prisma/client` and `prisma`
2. **Schema**: Converted Drizzle schema to Prisma schema with equivalent table structures
3. **Database Client**: Replaced Drizzle client with Prisma client
4. **Storage Layer**: Updated all database operations to use Prisma syntax
5. **Types**: Updated to use Prisma-generated types
6. **Validation**: Maintained Zod validation schemas for API endpoints

### Key Changes:

#### Database Connection (`server/db.ts`)
- Replaced Drizzle client with Prisma client
- Added singleton pattern for development
- Added graceful shutdown handling

#### Schema (`shared/schema.ts`)
- Now imports types from `@prisma/client`
- Maintains Zod validation schemas
- All type exports remain the same for API compatibility

#### Storage Layer (`server/storage.ts`)
- Updated all database queries from Drizzle syntax to Prisma syntax
- Maintained the same interface for backward compatibility
- Both MemStorage and DatabaseStorage implementations updated

#### Seed Script (`server/seed.ts`)
- Updated to use Prisma client methods
- Uses `createMany` for bulk inserts
- Maintains the same sample data

## Database Migration Strategy

### For Existing Data Preservation:

1. **Set up your DATABASE_URL**:
   ```bash
   cp .env.example .env
   # Edit .env and add your DATABASE_URL
   ```

2. **Initialize Prisma with existing database**:
   ```bash
   npx prisma db pull
   ```
   This will introspect your existing database and update the schema.

3. **Generate Prisma client**:
   ```bash
   npx prisma generate
   ```

4. **Create initial migration**:
   ```bash
   npx prisma migrate dev --name init
   ```

### For Fresh Setup:

1. **Set up your DATABASE_URL**:
   ```bash
   cp .env.example .env
   # Edit .env and add your DATABASE_URL
   ```

2. **Push schema to database**:
   ```bash
   npx prisma db push
   ```

3. **Seed the database**:
   ```bash
   npx tsx server/seed.ts
   ```

## Updated Scripts

The following npm scripts are now available:

- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Create and apply migrations
- `npm run db:generate` - Generate Prisma client
- `npm run db:studio` - Open Prisma Studio

## Schema Differences

### Drizzle vs Prisma Syntax:

**Drizzle (old)**:
```typescript
export const tours = pgTable("tours", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull().default("5.0"),
});
```

**Prisma (new)**:
```prisma
model Tour {
  id     Int    @id @default(autoincrement())
  name   String
  rating Float  @default(5.0)
  
  @@map("tours")
}
```

### Query Differences:

**Drizzle (old)**:
```typescript
const tours = await db.select().from(tours).where(eq(tours.isActive, true));
```

**Prisma (new)**:
```typescript
const tours = await db.tour.findMany({
  where: { isActive: true }
});
```

## Verification Steps

1. **Check TypeScript compilation**:
   ```bash
   npm run check
   ```

2. **Test API endpoints**:
   ```bash
   npm run dev
   ```

3. **Verify database operations**:
   - Test CRUD operations through the API
   - Check data integrity
   - Verify relationships work correctly

## Rollback Plan

If you need to rollback to Drizzle:

1. Restore the original `package.json` dependencies
2. Restore `drizzle.config.ts`
3. Restore original `server/db.ts`, `server/storage.ts`, `shared/schema.ts`, and `server/seed.ts`
4. Run `npm install` to restore Drizzle packages

## Benefits of Migration

1. **Better TypeScript Integration**: Prisma provides superior type safety
2. **Improved Developer Experience**: Better tooling and documentation
3. **Migration Management**: Built-in migration system
4. **Query Performance**: Optimized query generation
5. **Database Introspection**: Easy schema synchronization