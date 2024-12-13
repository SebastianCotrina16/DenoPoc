// deno-lint-ignore-file no-explicit-any
function toCamelCase(obj: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
        const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        result[camelCaseKey] = value;
    }
    return result;
}

export function mapRowsToCamelCase<T>(rows: Record<string, any>[]): T[] {
    return rows.map(toCamelCase) as T[];
}