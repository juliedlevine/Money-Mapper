import reducer from './SettingsReducer';
import df from 'deep-freeze';

it('update state when got expenses', () => {
    expect(reducer(df({ expenses: {} }), { type: 'get_expenses', payload: 'jdsflhgk' }))
        .toEqual({ expenses: 'jdsflhgk' });
});
