import { tokenService } from './token.service';

export const accountService = {
    login(accessToken: string) {
        tokenService.save(accessToken);
    },
    logout() {
        tokenService.clear();
    },
    isAuthenticated(): boolean {
        return tokenService.get() !== null;
    }
}