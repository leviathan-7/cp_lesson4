import {MiniMaple} from "../src/miniMaple";

test('diff ^ 1', () => {
    const MM = new MiniMaple()
    let text_of_function = 'x^3'
    let text_of_variable = 'x'
    let result = MM.diff(text_of_function,text_of_variable)
    expect(result).toBe('3*x^2');
}); 

test('diff ^ 2', () => {
    const MM = new MiniMaple()
    let text_of_function = 'x^-3'
    let text_of_variable = 'x'
    let result = MM.diff(text_of_function,text_of_variable)
    expect(result).toBe('- 3*x^-4');
}); 

test('diff ^ 3', () => {
    const MM = new MiniMaple()
    let text_of_function = '-x^-3'
    let text_of_variable = 'x'
    let result = MM.diff(text_of_function,text_of_variable)
    expect(result).toBe('3*x^-4');
}); 

test('diff * and x', () => {
    const MM = new MiniMaple()
    let text_of_function = '3*x'
    let text_of_variable = 'x'
    let result = MM.diff(text_of_function,text_of_variable)
    expect(result).toBe('3');
}); 

test('diff + and x^2', () => {
    const MM = new MiniMaple()
    let text_of_function = '3*x+  5*x^2'
    let text_of_variable = 'x'
    let result = MM.diff(text_of_function,text_of_variable)
    expect(result).toBe('3 + 10*x');
}); 

test('diff -', () => {
    const MM = new MiniMaple()
    let text_of_function = '3*x -5*x^3'
    let text_of_variable = 'x'
    let result = MM.diff(text_of_function,text_of_variable)
    expect(result).toBe('3 - 15*x^2');
}); 

test('diff without y', () => {
    const MM = new MiniMaple()
    let text_of_function = '3*x - 5*x^3'
    let text_of_variable = 'y'
    let result = MM.diff(text_of_function,text_of_variable)
    expect(result).toBe('0');
});

test('diff with y 1', () => {
    const MM = new MiniMaple()
    let text_of_function = '3*x - 5*x^3*y^-3'
    let text_of_variable = 'y'
    let result = MM.diff(text_of_function,text_of_variable)
    expect(result).toBe('15*x^3*y^-4');
});

test('diff with y 2', () => {
    const MM = new MiniMaple()
    let text_of_function = '3*x + 5*x^3*y^-3'
    let text_of_variable = 'y'
    let result = MM.diff(text_of_function,text_of_variable)
    expect(result).toBe('- 15*x^3*y^-4');
});

test('diff not polynom 1', () => {
    const MM = new MiniMaple()
    let text_of_function = '3x - 5*x^3*y^3'
    let text_of_variable = 'x'
    let result = MM.diff(text_of_function,text_of_variable)
    expect(result).toBe('Error');
});

test('diff not polynom 2', () => {
    const MM = new MiniMaple()
    let text_of_function = '3*x - 5*xx^3*y^3'
    let text_of_variable = 'x'
    let result = MM.diff(text_of_function,text_of_variable)
    expect(result).toBe('Error');
});

test('diff no', () => {
    const MM = new MiniMaple()
    let text_of_function = ''
    let text_of_variable = 'x'
    let result = MM.diff(text_of_function,text_of_variable)
    expect(result).toBe('Error');
});

test('diff not variable 1', () => {
    const MM = new MiniMaple()
    let text_of_function = '3*x - 5*xx^3*y^3'
    let text_of_variable = ''
    let result = MM.diff(text_of_function,text_of_variable)
    expect(result).toBe('Error');
});

test('diff not variable', () => {
    const MM = new MiniMaple()
    let text_of_function = '3*x - 5*xx^3*y^3'
    let text_of_variable = 'xy'
    let result = MM.diff(text_of_function,text_of_variable)
    expect(result).toBe('Error');
});

test('first is sign', () => {
    const MM = new MiniMaple()
    let text_of_function = '- 3*x -5*x^3'
    let text_of_variable = 'x'
    let result = MM.diff(text_of_function,text_of_variable)
    expect(result).toBe('- 3 - 15*x^2');
}); 
test('* x *', () => {
    const MM = new MiniMaple()
    let text_of_function = '3*x*y'
    let text_of_variable = 'x'
    let result = MM.diff(text_of_function,text_of_variable)
    expect(result).toBe('3*y');
});

test('diff x', () => {
    const MM = new MiniMaple()
    let text_of_function = 'x'
    let text_of_variable = 'x'
    let result = MM.diff(text_of_function,text_of_variable)
    expect(result).toBe('1');
}); 

test('diff x*y', () => {
    const MM = new MiniMaple()
    let text_of_function = 'x*y' 
    let text_of_variable = 'x'
    let result = MM.diff(text_of_function,text_of_variable)
    expect(result).toBe('y');
}); 

test('no variable', () => {
    const MM = new MiniMaple()
    let text_of_function = '- 3*x - + 5*x^3'
    let text_of_variable = 'x'
    let result = MM.diff(text_of_function,text_of_variable)
    expect(result).toBe('Error');
}); 

test('no *', () => {
    const MM = new MiniMaple()
    let text_of_function = '- 3*xy^3'
    let text_of_variable = 'x'
    let result = MM.diff(text_of_function,text_of_variable)
    expect(result).toBe('Error');
}); 
