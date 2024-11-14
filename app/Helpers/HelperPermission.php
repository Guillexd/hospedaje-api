<?php

namespace App\Helpers;

use Illuminate\Support\Collection;

class HelperPermission
{
    public static function all(): Collection
    {
        $permissions = collect([
            'see_dashboard' => 'Ver dashboard / Inicio',
            'see_users' => 'Ver usuarios',
            'add_users' => 'Añadir usuarios',
            'edit_users' => 'Editar usuarios',
            'delete_users' => 'Eliminar usuarios',
            'see_housing' => 'Ver propiedades',
            'add_housing' => 'Añadir propiedades',
            'edit_housing' => 'Editar propiedades',
            'delete_housing' => 'Eliminar propiedades',
            'see_identity_document' => 'Ver documentos de identidad',
            'add_identity_document' => 'Añadir documentos de identidad',
            'edit_identity_document' => 'Editar documentos de identidad',
            'delete_identity_document' => 'Eliminar documentos de identidad',
            'see_tenancies' => 'Ver inquilinos',
            'add_tenancies' => 'Añadir inquilinos',
            'edit_tenancies' => 'Editar inquilinos',
            'delete_tenancies' => 'Eliminar inquilinos',
            'see_housing_room' => 'Ver habitaciones',
            'add_housing_room' => 'Añadir habitaciones',
            'edit_housing_room' => 'Editar habitaciones',
            'delete_housing_room' => 'Eliminar habitaciones',
            'see_housing_payment' => 'Ver alquileres',
            'add_housing_payment' => 'Añadir alquileres',
            'edit_housing_payment' => 'Editar alquileres',
            'delete_housing_payment' => 'Eliminar alquileres',
            'collect_add_payment_housing_payment' => 'Cobrar y añadir nuevo alquiler',
            'just_collect_housing_payment' => 'Cobrar alquiler',
            'cancel_collect_housing_payment' => 'Cancelar el cobro de alquiler',
            'get_rent_expire_housing_payment' => 'Obtener alquileres por vencer en los próximos 7 días',
            'get_dni' => 'Buscar por dni',
            'get_ruc' => 'Buscar por ruc',
            'change_status' => 'Cambiar el estado de los registros',
        ]);

        return $permissions;
    }
}
