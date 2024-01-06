type Animal = {
 name: string;
}

const animal: Animal = { name: 'a' }


describe('animal', () => {
 it('should have name', () => {
   debugger;
   expect(animal.name).toBe('b');
 });
});
