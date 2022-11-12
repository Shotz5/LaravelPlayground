import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Setting from '@/Components/Setting';
import { Head } from '@inertiajs/inertia-react';
import { useForm } from '@inertiajs/inertia-react'
import InputError from '@/Components/InputError';

export default function Index({ auth, settings }) {
    const { data, setData, post, clearErrors, reset, errors } = useForm({
        shortname: "",
        value: "",
        description: ""
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('settings.store'), { onSuccess: () => reset() });
    };

    const clear = (e) => {
        e.preventDefault();
        reset();
    }

    return (
        <AuthenticatedLayout
            auth={ auth }
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Settings</h2>}
        >
            <Head title="Settings" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Application Settings</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">View and Edit Values Here</p>
                        </div>
                        <div className="border-t border-gray-200">
                            <dl>
                                <div className="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6">
                                    <dt className="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0 bold">Setting</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0 bold">Value</dd>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 bold">Description</dd>
                                </div>
                            </dl>
                        </div>

                        {settings.map((setting, i) =>
                            <Setting key={setting.id} setting={setting} even={i % 2 ? true : false} />
                        )}

                        <div className="border-t border-gray-200">
                            <form onSubmit={submit}>
                                <div className={"bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6"}>
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
                                            onClick={e => clear(e)}
                                        >
                                            Clear
                                        </button>
                                        <button
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}