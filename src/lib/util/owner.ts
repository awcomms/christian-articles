export const owner = (id: string): boolean => {
    return page.session.user.id === id
}