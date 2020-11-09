import Offer from '../models/offer.model';

class Util {
    buildOfferReturn(offers: Array<Offer>) {
        return offers.map(offer => {
            return {
                full_price: offer.fullPrice,
                price_with_discount: offer.priceWithDiscount,
                discount_percentage: offer.discountPercentage,
                start_date: offer.startDate,
                enrollment_semester: offer.enrollmentSemester,
                enabled: offer.enabled,
                course: {
                    name: offer.course.name,
                    kind: offer.course.kind,
                    level: offer.course.level,
                    shift: offer.course.shift,
                },
                university: {
                    name: offer.course.campus.university.name,
                    score: offer.course.campus.university.score,
                    logo_url: offer.course.campus.university.logoUrl,
                },
                campus: {
                    name: offer.course.campus.name,
                    city: offer.course.campus.city,
                },
            };
        });
    }
}

export const OfferUtil: Util = new Util();
