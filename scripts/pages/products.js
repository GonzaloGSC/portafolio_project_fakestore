export function FuncGetPurchases(user) {
    let localPurchases = JSON.parse(localStorage.getItem("purchases"));
    if (localPurchases) {
        return localPurchases.map(e => {
            if (e.user_email === user.email) {
                return e;
            }
        });
    } else {
        return [];
    };
};