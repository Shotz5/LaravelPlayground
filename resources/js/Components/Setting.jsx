import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/inertia-react'
import InputError from '@/Components/InputError';

export default function Setting({ setting, even }) {
    const [editing, setEditing] = useState(false);

    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        shortname: setting.shortname,
        value: setting.value,
        description: setting.description
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('settings.update', setting.id), { onSuccess: () => setEditing(false) });
    };

    return (
        <div className="border-t border-gray-200">
            <dl>
                {editing
                    ?
                        <form onSubmit={submit}>
                            <div className={even ? "bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6" : "bg-white px-4 py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6"}>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0">
                                    <input 
                                        type="text"
                                        name="shortname"
                                        id="shortname"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={data.shortname}
                                        onChange={e => setData('shortname', e.target.value)}
                                    />
                                    <InputError message={errors.message} class="mt-2" />
                                </dd>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0">
                                    <input 
                                        type="text"
                                        name="value"
                                        id="value"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={data.value}
                                        onChange={e => setData('value', e.target.value)}
                                    />
                                    <InputError message={errors.message} class="mt-2" />
                                </dd>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <input 
                                        type="text"
                                        name="description"
                                        id="description"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                    />
                                    <InputError message={errors.message} class="mt-2" />
                                </dd>
                                <div className="ml-4 sm:col-span-1 text-right space-x-4">
                                    <button
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        onClick={() => { setEditing(false); reset(); clearErrors(); }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    : 
                    <div className={even ? "bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6" : "bg-white px-4 py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6"}>
                        <dt className="text-sm font-medium text-gray-500">{setting.shortname}</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0">{setting.value}</dd>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{setting.description}</dd>
                        <div className="ml-4 sm:col-span-1 text-right">
                            <button className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => setEditing(true)}>
                                Edit
                            </button>
                        </div>
                    </div>
                }
            </dl>
        </div>
    );
}