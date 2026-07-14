'use server';

import { supabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

function getSupabaseAdmin() {
  if (!supabaseAdmin) {
    throw new Error('Supabase Admin client not initialized');
  }
  return supabaseAdmin;
}

interface CategoryData {
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
}

interface ProductData {
  name: string;
  slug: string;
  category_id: string;
  description?: string;
  dimensions?: string;
  base_price: string;
  is_wet: boolean;
  requires_staff: boolean;
  stock_quantity: string;
  status: string;
  image_url?: string;
}

interface BookingItem {
  product_id: string | number;
  quantity: number;
  price_per_unit: number;
}

interface BookingData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  delivery_address: string;
  total_price: number;
  notes?: string;
  items: BookingItem[];
}

// Categories
export async function createCategory(data: CategoryData) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from('categories').insert({
    name: data.name,
    slug: data.slug,
    description: data.description,
    image_url: data.image_url,
  });

  if (error) {
    console.error('Error creating category:', error);
    throw new Error(error.message);
  }

  revalidatePath('/admin/categories');
  redirect('/admin/categories');
}

export async function updateCategory(id: number, data: CategoryData) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from('categories')
    .update({
      name: data.name,
      slug: data.slug,
      description: data.description,
      image_url: data.image_url,
    })
    .eq('id', id);

  if (error) {
    console.error('Error updating category:', error);
    throw new Error(error.message);
  }

  revalidatePath('/admin/categories');
  redirect('/admin/categories');
}

export async function deleteCategory(id: number) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from('categories').delete().eq('id', id);

  if (error) {
    console.error('Error deleting category:', error);
    throw new Error(error.message);
  }

  revalidatePath('/admin/categories');
}

// Products
export async function createProduct(data: ProductData) {
  const supabase = getSupabaseAdmin();
  const { data: product, error } = await supabase.from('products').insert({
    name: data.name,
    slug: data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    category_id: data.category_id ? parseInt(data.category_id) : null,
    description: data.description,
    dimensions: data.dimensions?.slice(0, 50),
    base_price: parseFloat(data.base_price),
    is_wet: data.is_wet,
    requires_staff: data.requires_staff,
    stock_quantity: parseInt(data.stock_quantity),
    status: data.status,
  }).select('id').single();

  if (error) {
    console.error('Error creating product:', error);
    throw new Error(error.message);
  }

  if (data.image_url && product?.id) {
    await supabase.from('product_images').insert({
      product_id: product.id,
      image_url: data.image_url,
      is_primary: true,
    });
  }

  revalidatePath('/admin/products');
  redirect('/admin/products');
}

export async function updateProduct(id: number, data: ProductData) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from('products')
    .update({
      name: data.name,
      slug: data.slug,
      category_id: data.category_id ? parseInt(data.category_id) : null,
      description: data.description,
      dimensions: data.dimensions?.slice(0, 50),
      base_price: parseFloat(data.base_price),
      is_wet: data.is_wet,
      requires_staff: data.requires_staff,
      stock_quantity: parseInt(data.stock_quantity),
      status: data.status,
    })
    .eq('id', id);

  if (error) {
    console.error('Error updating product:', error);
    throw new Error(error.message);
  }

  if (data.image_url) {
    await supabase.from('product_images').delete().eq('product_id', id).eq('is_primary', true);
    await supabase.from('product_images').insert({ product_id: id, image_url: data.image_url, is_primary: true });
  }

  revalidatePath('/admin/products');
  redirect('/admin/products');
}

export async function deleteProduct(id: number) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from('products').delete().eq('id', id);

  if (error) {
    console.error('Error deleting product:', error);
    throw new Error(error.message);
  }

  revalidatePath('/admin/products');
}

import { Resend } from 'resend';

const resend = new Resend(process.env.resend_key);

// Bookings - Forward via Email only (no DB storage as per user request)
export async function createBooking(data: BookingData) {
  try {
    const itemsHtml = data.items.map((item: BookingItem) => `
      <div style="padding: 10px; border-bottom: 1px solid #edf2f7;">
        <p style="margin: 0; font-weight: bold; color: #1a202c;">Item ID: ${item.product_id}</p>
        <p style="margin: 5px 0 0; color: #718096; font-size: 14px;">Quantity: ${item.quantity} | Price: $${item.price_per_unit}</p>
      </div>
    `).join('');

    const { error: emailError } = await resend.emails.send({
      from: 'Treston Inflatable for Sale and Rentals <bookings@trestoninflatablesrentalsandsales.com>',
      to: 'trestoninflatables@gmail.com',
      replyTo: data.customer_email,
      subject: `NEW BOOKING REQUEST: ${data.customer_name}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
          <div style="background: #0f172a; padding: 28px 32px; text-align: center;">
            <p style="margin: 0 0 4px; color: #8b5cf6; font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;">New Booking</p>
            <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 800;">Treston Inflatable for Sale and Rentals</h1>
            <p style="margin: 6px 0 0; color: #94a3b8; font-size: 13px;">trestoninflatables@gmail.com</p>
          </div>

          <div style="padding: 32px;">
            <h2 style="margin: 0 0 16px; color: #0f172a; font-size: 18px; font-weight: 700; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">Customer Information</h2>
            <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-bottom: 24px; border-left: 4px solid #8b5cf6;">
              <p style="margin: 0 0 8px; font-size: 14px; color: #475569;"><strong style="color: #0f172a;">Name:</strong> ${data.customer_name}</p>
              <p style="margin: 0 0 8px; font-size: 14px; color: #475569;"><strong style="color: #0f172a;">Email:</strong> ${data.customer_email}</p>
              <p style="margin: 0; font-size: 14px; color: #475569;"><strong style="color: #0f172a;">Phone:</strong> ${data.customer_phone}</p>
            </div>

            <h2 style="margin: 0 0 16px; color: #0f172a; font-size: 18px; font-weight: 700; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">Event Details</h2>
            <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
              <p style="margin: 0 0 8px; font-size: 14px; color: #475569;"><strong style="color: #0f172a;">Dates:</strong> ${data.start_date} → ${data.end_date}</p>
              <p style="margin: 0 0 8px; font-size: 14px; color: #475569;"><strong style="color: #0f172a;">Times:</strong> ${data.start_time} – ${data.end_time}</p>
              <p style="margin: 0 0 8px; font-size: 14px; color: #475569;"><strong style="color: #0f172a;">Address:</strong> ${data.delivery_address}</p>
              <p style="margin: 0; font-size: 14px; color: #475569;"><strong style="color: #0f172a;">Notes:</strong> ${data.notes || 'None'}</p>
            </div>

            <h2 style="margin: 0 0 12px; color: #0f172a; font-size: 18px; font-weight: 700; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">Requested Items</h2>
            <div style="background: #f8fafc; border-radius: 8px; overflow: hidden; margin-bottom: 24px;">
              ${itemsHtml}
            </div>

            <div style="background: #0f172a; border-radius: 8px; padding: 16px 20px; text-align: right;">
              <p style="margin: 0; font-size: 18px; font-weight: 900; color: #ffffff;">Total Estimated: <span style="color: #8b5cf6;">$${data.total_price.toFixed(2)}</span></p>
            </div>
          </div>

          <div style="background: #f1f5f9; padding: 16px 32px; text-align: center; color: #94a3b8; font-size: 12px;">
            Automated booking alert · Treston Inflatable for Sale and Rentals · trestoninflatables@gmail.com
          </div>
        </div>
      `,
    });

    if (emailError) {
      console.error('Error sending booking email:', emailError);
      return { success: false, error: 'Failed to send booking notification.' };
    }

    revalidatePath('/admin');
    // Return a dummy ID since we're not saving to DB
    return { success: true, bookingId: Date.now().toString() };
  } catch (error) {
    console.error('Booking submission error:', error);
    return { success: false, error: 'Internal server error during booking submission.' };
  }
}
