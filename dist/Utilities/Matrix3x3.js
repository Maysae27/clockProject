"use strict";
class Matrix3x3 {
    constructor(values) {
        this.matrix = values;
    }
    // Matrix multiplication
    multiply(other) {
        const result = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                result[i][j] = 0;
                for (let k = 0; k < 3; k++) {
                    result[i][j] += this.matrix[i][k] * other.matrix[k][j];
                }
            }
        }
        return new Matrix3x3(result);
    }
    // Matrix inversion
    invert() {
        const m = this.matrix;
        const det = m[0][0] * (m[1][1] * m[2][2] - m[2][1] * m[1][2]) -
            m[0][1] * (m[1][0] * m[2][2] - m[2][0] * m[1][2]) +
            m[0][2] * (m[1][0] * m[2][1] - m[2][0] * m[1][1]);
        if (det === 0)
            return null; // Singular matrix
        const invDet = 1 / det;
        const result = [
            [
                (m[1][1] * m[2][2] - m[2][1] * m[1][2]) * invDet,
                (m[0][2] * m[2][1] - m[0][1] * m[2][2]) * invDet,
                (m[0][1] * m[1][2] - m[0][2] * m[1][1]) * invDet
            ],
            [
                (m[1][2] * m[2][0] - m[1][0] * m[2][2]) * invDet,
                (m[0][0] * m[2][2] - m[0][2] * m[2][0]) * invDet,
                (m[0][2] * m[1][0] - m[0][0] * m[1][2]) * invDet
            ],
            [
                (m[1][0] * m[2][1] - m[1][1] * m[2][0]) * invDet,
                (m[0][1] * m[2][0] - m[0][0] * m[2][1]) * invDet,
                (m[0][0] * m[1][1] - m[0][1] * m[1][0]) * invDet
            ]
        ];
        return new Matrix3x3(result);
    }
    // Apply a transformation to a point
    transformPoint(x, y) {
        const px = this.matrix[0][0] * x + this.matrix[0][1] * y + this.matrix[0][2];
        const py = this.matrix[1][0] * x + this.matrix[1][1] * y + this.matrix[1][2];
        return [px, py];
    }
}
function createTranslationMatrix(tx, ty) {
    return new Matrix3x3([
        [1, 0, tx],
        [0, 1, ty],
        [0, 0, 1]
    ]);
}
function createRotationMatrix(angle) {
    const rad = angle * Math.PI / 180;
    return new Matrix3x3([
        [Math.cos(rad), -Math.sin(rad), 0],
        [Math.sin(rad), Math.cos(rad), 0],
        [0, 0, 1]
    ]);
}
function createScalingMatrix(sx, sy) {
    return new Matrix3x3([
        [sx, 0, 0],
        [0, sy, 0],
        [0, 0, 1]
    ]);
}
const translation = createTranslationMatrix(5, 10);
const rotation = createRotationMatrix(45);
const scaling = createScalingMatrix(2, 3);
const combinedMatrix = translation.multiply(rotation).multiply(scaling);
const point = [1, 1];
const transformedPoint = combinedMatrix.transformPoint(point[0], point[1]);
console.log('Transformed Point:', transformedPoint);
//# sourceMappingURL=Matrix3x3.js.map