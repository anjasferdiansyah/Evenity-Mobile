export const ROUTES = {
    AUTH: {
        INDEX: 'auth',
        LOGIN: 'auth/login',
        REGISTER: 'auth/register',
        COMPLETING_REGISTER: 'auth/completing-register',
    },
    DASHBOARD: {
        INDEX: 'dashboard',
        PROFILE: {
            INDEX: 'dashboard/profile',
            EDIT: 'dashboard/profile/edit',
            CHANGE_PASSWORD: 'dashboard/profile/change-password',
        },
        EVENT: {
            INDEX: 'dashboard/event',
            DETAIL: 'dashboard/event/detail',
            NEW: {
                INDEX: 'dashboard/make-event',
                WHERE: 'dashboard/make-event/where',
                WHEN: 'dashboard/make-event/when',
                CAPACITY: 'dashboard/make-event/capacity',
                DESCRIPTION: 'dashboard/make-event/description',
                THEME: 'dashboard/make-event/theme',
                VENDOR: 'dashboard/make-event/vendor',
                FINAL: 'dashboard/make-event/final',
            },
        },
        PRODUCT: {
            INDEX: 'dashboard/product',
            DETAIL: 'dashboard/product/detail',
            NEW: 'dashboard/product/new',
        },
        REQUEST: {
            INDEX: 'dashboard/request',
            DETAIL: 'dashboard/request/detail',
        },
        TRANSACTION: {
            INDEX: 'dashboard/transaction',
            DETAIL: 'dashboard/transaction/detail',
            WITHDRAW: {
                INDEX: 'dashboard/transaction/withdraw',
                HISTORY: 'dashboard/transaction/withdraw/history',
                FINAL: 'dashboard/transaction/withdraw/final',
            },
        },
    },
    WELCOME: 'welcome',
    INDEX: '/',
    ROOT: '/',
}