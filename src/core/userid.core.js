function UserId() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%¨&*¶⁋⁜⁂♪…:⁏⁘✕';
    let part1 = '';
    let part2 = '';
    let part3 = '';
    for (let i = 0; i < 20; i++) {
        part1 += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    for (let i = 0; i < 20; i++) {
        part2 += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    for (let i = 0; i < 20; i++) {
        part3 += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }

    return `${part1}-${part2}-${part3}`;
}

export default UserId;