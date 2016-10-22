'use strict';

//import {reset} from 'aexpr-source-transformation-propagation';

describe('Signal Logic', function() {

    it('one simple dataflow', () => {
        let a = 0;
        let s = aexpr(() => a)
            // TODO: weird issue prevents us from using a parameter for the .onChanged callback
            .onChange(() => s = a)
            .getCurrentValue();

        expect(s).to.equal(0);

        a = 42;

        expect(s).to.equal(42);
        expect(s).to.equal(a);
    });

    it('works transitively', () => {
        let a = 5,
            spy = sinon.spy();

        let b = aexpr(() => a + 2)
            .onChange(() => b = a + 2)
            .getCurrentValue();

        let c = aexpr(() => b + 2)
            .onChange(() => c = b + 2)
            .getCurrentValue();

        expect(b).to.equal(a + 2);
        expect(c).to.equal(b + 2);

        a = 17;

        expect(b).to.equal(a + 2);
        expect(c).to.equal(b + 2);
    });

    it('shows the glitch problem', () => {
        let a = 0;
        let b = aexpr(() => a + 1)
            .onChange(() => b = a + 1)
            .getCurrentValue();
        let c = aexpr(() => a - 1)
            .onChange(() => c = a - 1)
            .getCurrentValue();
        let alwaysTrue = aexpr(() => b > c)
            .onChange(() => alwaysTrue = b > c)
            .getCurrentValue();
        let spy = sinon.spy();
        aexpr(() => alwaysTrue).onChange(spy);

        expect(alwaysTrue).to.be.true;

        a = -10;
        // alwaysTrue becomes false temporarily :(
        expect(spy.withArgs(false)).to.be.calledOnce;
        expect(spy.withArgs(true)).to.be.calledOnce;

        expect(alwaysTrue).to.be.true;
    });
});
